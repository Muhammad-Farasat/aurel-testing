/**
 * AUREL's functional icon set: 24px grid, 1.5px stroke, square caps and joins
 * to match the radius-0 system. Used only inside controls and status lines.
 */
const paths = {
  "plane-arrive": "M3 20h18M4.5 9.5l3 4.5 12 3.2c.9.2 1.6-.9 1-1.6l-.6-.6-6.4-2.4-2.7-7.1-1.9-.5 1 6.2-3.6-1.1-1.1-2.6z",
  "plane-depart": "M3 20h18M3.5 14.5l3.8 2.4 13-4.6c.9-.3.9-1.6-.1-1.8l-.8-.1-6.8.9-5-5.6-1.9.3 2.9 5.6-3.8.5-2-2.1z",
  pin: "M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3.5 2",
  seat: "M7 3v11h10M7 14l-1 7M17 14v7M11 14V8h6",
  bag: "M5 8h14v12H5zM9 8V4h6v4M9 12v4M15 12v4",
  stop: "M12 3v18M5 9h14",
  swap: "M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3",
  edit: "M4 20h4L19 9l-4-4L4 16zM13 7l4 4",
  close: "M5 5l14 14M19 5L5 19",
  error: "M12 3l10 18H2zM12 10v5M12 17.5v.5",
  check: "M4 12.5l5 5L20 6.5",
  arrow: "M4 12h15M13 6l6 6-6 6",
  "arrow-left": "M20 12H5M11 6l-6 6 6 6",
  plus: "M12 4v16M4 12h16",
  minus: "M4 12h16",
  calendar: "M3 5h18v16H3zM3 10h18M8 2v5M16 2v5",
  chevron: "M6 9l6 6 6-6",
  share: "M12 3v13M7 8l5-5 5 5M4 14v7h16v-7",
  download: "M12 3v13M7 11l5 5 5-5M4 21h16",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 24, className, title }: { name: IconName; size?: number; className?: string; title?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d={paths[name]} />
    </svg>
  );
}
