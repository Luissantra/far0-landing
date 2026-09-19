type IconProps = {
  className?: string;
  title?: string;
  gradientId: string;
};

export function FaroIcon({ className, title = "Far0 logo", gradientId }: IconProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={title} focusable="false">
      <title>{title}</title>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#008e65" />
          <stop offset="48%" stopColor="#07b37c" />
          <stop offset="100%" stopColor="#a7f3d0" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        d="M1.12 17.31c0-9.29 7.12-16.79 15.9-16.79h46.39c8.56 0 15.63 7.35 15.63 16.38v45.28c0 9.46-7.7 16.87-16.39 16.87h-45.23c-9.07 0-16.3-7.31-16.3-16.97v-44.77z M43.37 0.47 7.92 71.13 58.91 0.47h-15.54z"
        fill={`url(#${gradientId})`}
      />
      <circle cx="20.8" cy="50.68" r="2.4" fill="#A7F3D0" />
    </svg>
  );
}

export function FaroLockup({ className, gradientId }: { className?: string; gradientId: string }) {
  return (
    <span className={`lp-lockup ${className ?? ""}`}>
      <FaroIcon className="lp-lockup-icon" title="Far0" gradientId={gradientId} />
      <span className="lp-wordmark" aria-hidden="true">
        Far<span className="lp-zero">0</span>
      </span>
    </span>
  );
}
