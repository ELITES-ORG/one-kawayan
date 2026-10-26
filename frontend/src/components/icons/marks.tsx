import { cn } from '@/lib/cn';

export type MarkName =
  | 'home'
  | 'services'
  | 'civic'
  | 'news'
  | 'report'
  | 'phone'
  | 'pay'
  | 'search'
  | 'plus'
  | 'award'
  | 'sun'
  | 'moon';

const PART = ['mark-part mark-a', 'mark-part mark-b', 'mark-part mark-c'] as const;

/**
 * Small stroke icons. Each path is its own part so a selection can move them
 * separately. They are drawn, not fetched, and they do not pull in an icon
 * library.
 */
export function Mark({
  name,
  live = false,
  delay = 0,
  className,
}: {
  name: MarkName;
  live?: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('mark size-6 shrink-0', live && 'is-live', className)}
      style={delay > 0 ? { ['--mark-delay' as string]: `${delay}ms` } : undefined}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths(name).map((d, index) => (
        <path key={d} d={d} className={PART[index]} />
      ))}
    </svg>
  );
}

function paths(name: MarkName): readonly [string, string, string] {
  switch (name) {
    case 'home':
      return [
        'M4 11.2 12 4.4 20 11.2',
        'M6.5 10.2V19.5h11V10.2',
        'M10 19.5v-5h4v5',
      ];
    case 'services':
      return [
        'M7 3.5h6.2L18.5 8.8V20.5H7z',
        'M13.2 3.5V8.8h5.3',
        'M10 13h5.5M10 16.5H14',
      ];
    case 'civic':
      return [
        'M4 20.5h16',
        'M6.5 20.5V10L12 5.2 17.5 10v10.5',
        'M10.2 20.5V15h3.6v5.5',
      ];
    case 'pay':
      return [
        'M4 7h16v10H4z',
        'M4 11h16',
        'M7.5 14.5h5',
      ];
    case 'search':
      return [
        'M10.5 6a4.5 4.5 0 1 0 .01 0',
        'M14 14.2 18.5 18.7',
        'M8.6 10.5h3.8',
      ];
    case 'plus':
      return [
        'M12 6.5v4.2',
        'M12 13.3v4.2',
        'M6.5 12h11',
      ];
    case 'award':
      return [
        'M5.5 7h4M5.5 12h4M5.5 17h4',
        'M11.5 7h7M11.5 12h7',
        'M11.5 17h4.5',
      ];
    case 'news':
      return [
        'M5 4.5h11.5V19.5H5z',
        'M8 8.5h6',
        'M8 12h6M8 15.5h4',
      ];
    case 'report':
      return [
        'M16.9 9.6a4.9 4.9 0 1 1-9.8 0 4.9 4.9 0 0 1 9.8 0z',
        'M8.1 12.4C9.2 16 12 20.6 12 20.6s2.8-4.6 3.9-8.2',
        'M12 9.6a1.5 1.5 0 1 0 .01 0',
      ];
    case 'phone':
      return [
        'M8 3.5h8A1.5 1.5 0 0 1 17.5 5v14a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 19V5A1.5 1.5 0 0 1 8 3.5z',
        'M10 6.5h4',
        'M12 17.2a.9.9 0 1 0 .01 0',
      ];
    case 'sun':
      return [
        'M12 8.2a3.8 3.8 0 1 0 0.01 0',
        'M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21',
        'M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6',
      ];
    case 'moon':
      return [
        'M15 4.2A7.2 7.2 0 1 0 15 19.8 5.6 5.6 0 0 1 15 4.2z',
        'M17.2 7.2l.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4z',
        'M18.6 12.4l.3.7.7.3-.7.3-.3.7-.3-.7-.7-.3.7-.3z',
      ];
  }
}
