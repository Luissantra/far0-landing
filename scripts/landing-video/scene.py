"""Studio lighthouse scene. Render with Blender 4.5 LTS."""

import argparse
import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

parser = argparse.ArgumentParser()
parser.add_argument("--output", required=True)
parser.add_argument("--frames", type=int, default=144)
parser.add_argument("--preview", action="store_true")
args = parser.parse_args(sys.argv[sys.argv.index("--") + 1:])
output = Path(args.output)
output.mkdir(parents=True, exist_ok=True)

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.samples = 16
scene.cycles.adaptive_threshold = 0.05
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 5
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.resolution_percentage = 50 if args.preview else 100
scene.render.image_settings.file_format = "PNG"
scene.render.film_transparent = False
scene.render.use_persistent_data = True
scene.render.threads_mode = "FIXED"
scene.render.threads = 6
scene.world.color = (0.1, 0.12, 0.15)
scene.view_settings.view_transform = "AgX"
scene.view_settings.look = "AgX - Medium High Contrast"
scene.render.fps = 24
scene.frame_start = 1
scene.frame_end = args.frames


def material(name, color, metallic=0.0, roughness=0.4, emission=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = (*color, 1)
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Emission Color"].default_value = (*color, 1)
    shader.inputs["Emission Strength"].default_value = emission
    return mat


ceramic = material("Brushed graphite", (0.19, 0.23, 0.25), 0.65, 0.3)
metal = material("Satin aluminium", (0.33, 0.38, 0.4), 0.82, 0.23)
dark = material("Ink", (0.018, 0.024, 0.034), 0.3, 0.45)
green = material("Emerald optic", (0.008, 0.45, 0.22), 0.3, 0.25, 2.0)
lamp = material("Lamp", (0.55, 1.0, 0.78), 0.0, 0.25, 5.0)


def finish(obj, name, mat, bevel=0.025):
    obj.name = name
    obj.data.materials.append(mat)
    if bevel:
        modifier = obj.modifiers.new("Machined edges", "BEVEL")
        modifier.width = bevel
        modifier.segments = 3
    for polygon in obj.data.polygons:
        polygon.use_smooth = True
    return obj


def cylinder(name, radius, depth, z, mat, top=None):
    bpy.ops.mesh.primitive_cone_add(
        vertices=96, radius1=radius, radius2=radius if top is None else top,
        depth=depth, location=(0, 0, z)
    )
    return finish(bpy.context.object, name, mat)


def ring(name, radius, thickness, z, mat):
    bpy.ops.mesh.primitive_torus_add(
        major_segments=96, minor_segments=12,
        major_radius=radius, minor_radius=thickness, location=(0, 0, z)
    )
    return finish(bpy.context.object, name, mat, 0)


def aim(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


def area(name, location, power, color, size):
    data = bpy.data.lights.new(name, "AREA")
    data.energy = power
    data.color = color
    data.shape = "DISK"
    data.size = size
    obj = bpy.data.objects.new(name, data)
    scene.collection.objects.link(obj)
    obj.location = location
    aim(obj, (0, 0, 1.7))


cylinder("Plinth", 1.25, 0.18, 0.09, dark)
cylinder("Raised platform", 1.06, 0.12, 0.22, ceramic)
ring("Platform seam", 1.07, 0.008, 0.26, metal)
cylinder("Footing", 0.57, 0.14, 0.34, metal)
cylinder("Tower", 0.43, 2.25, 1.53, ceramic, 0.29)
cylinder("Base collar", 0.45, 0.12, 0.48, dark)
ring("Lower seam", 0.415, 0.009, 0.71, metal)
cylinder("Lantern deck", 0.59, 0.09, 2.7, metal)
cylinder("Lantern floor", 0.4, 0.1, 2.77, dark)
cylinder("Optic housing", 0.31, 0.51, 3.06, green)
cylinder("Central lamp", 0.17, 0.47, 3.06, lamp)
for index in range(8):
    ring("Fresnel lens", 0.32, 0.017, 2.86 + index * 0.057, metal)

for index in range(8):
    angle = index * math.tau / 8
    post = cylinder("Lantern support", 0.022, 0.59, 3.05, metal)
    post.location.x = 0.39 * math.cos(angle)
    post.location.y = 0.39 * math.sin(angle)
    rail = cylinder("Gallery post", 0.012, 0.18, 2.83, metal)
    rail.location.x = 0.54 * math.cos(angle)
    rail.location.y = 0.54 * math.sin(angle)
ring("Gallery rail", 0.54, 0.013, 2.92, metal)
cylinder("Roof edge", 0.49, 0.065, 3.39, metal)
cylinder("Roof", 0.49, 0.25, 3.53, ceramic, 0.075)
cylinder("Finial", 0.025, 0.17, 3.72, metal, 0.005)

for z in (1.15, 1.95):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, -0.367 + (z - 1.15) * 0.06, z))
    window = bpy.context.object
    window.scale = (0.1, 0.04, 0.22)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    finish(window, "Recessed window", dark, 0.025)

bpy.ops.mesh.primitive_plane_add(size=200)
finish(bpy.context.object, "Studio floor", material("Floor", (0.025, 0.033, 0.046), 0.45, 0.34), 0)

area("Key softbox", (1, -5, 8), 1100, (0.85, 0.93, 1), 5)
area("Edge softbox", (3, 3, 5), 1450, (0.5, 0.9, 0.77), 3)
area("Fill", (-5, -1, 3), 650, (0.57, 0.68, 0.85), 4)

light = bpy.data.lights.new("Optic glow", "POINT")
light.energy = 32
light.color = (0.04, 1, 0.46)
light.shadow_soft_size = 0.4
obj = bpy.data.objects.new("Optic glow", light)
scene.collection.objects.link(obj)
obj.location = (0, 0, 3.06)

volume = bpy.data.materials.new("Light in atmosphere")
volume.use_nodes = True
volume.node_tree.nodes.clear()
out = volume.node_tree.nodes.new("ShaderNodeOutputMaterial")
shader = volume.node_tree.nodes.new("ShaderNodeVolumePrincipled")
shader.inputs["Density"].default_value = 0.015
shader.inputs["Color"].default_value = (0.01, 0.5, 0.22, 1)
shader.inputs["Emission Color"].default_value = (0.01, 0.55, 0.23, 1)
shader.inputs["Emission Strength"].default_value = 0.12
volume.node_tree.links.new(shader.outputs["Volume"], out.inputs["Volume"])
bpy.ops.object.empty_add(location=(0, 0, 3.06))
beacon = bpy.context.object
beacon.name = "Rotating beacon"
bpy.ops.mesh.primitive_cone_add(vertices=64, radius1=0.08, radius2=0.95, depth=7)
beam = bpy.context.object
beam.name = "Volumetric beam"
beam.data.materials.append(volume)
beam.parent = beacon
beam.location = (3.5, 0, 0)
beam.rotation_euler[1] = math.pi / 2

bpy.ops.object.camera_add(location=(6, -10, 6))
camera = bpy.context.object
scene.camera = camera
camera.data.type = "ORTHO"
camera.data.ortho_scale = 8.6
camera.data.lens = 50

for frame, angle in ((1, -0.2), (args.frames, 0.2)):
    camera.location = (10 * math.sin(angle + 0.4), -10 * math.cos(angle + 0.4), 5.7)
    aim(camera, (0, 0, 1.8))
    camera.keyframe_insert(data_path="location", frame=frame)
    camera.keyframe_insert(data_path="rotation_euler", frame=frame)
    beacon.rotation_euler.z = angle * 4 + 0.5
    beacon.keyframe_insert(data_path="rotation_euler", frame=frame)

scene.use_nodes = True
nodes = scene.node_tree.nodes
nodes.clear()
render = nodes.new("CompositorNodeRLayers")
glare = nodes.new("CompositorNodeGlare")
glare.glare_type = "FOG_GLOW"
glare.quality = "HIGH"
composite = nodes.new("CompositorNodeComposite")
scene.node_tree.links.new(render.outputs["Image"], glare.inputs["Image"])
scene.node_tree.links.new(glare.outputs["Image"], composite.inputs["Image"])
scene.frame_set(1)
scene.render.filepath = str(output / ("preview.png" if args.preview else "frame-"))
if args.preview:
    bpy.ops.render.render(write_still=True)
else:
    bpy.ops.render.render(animation=True)
