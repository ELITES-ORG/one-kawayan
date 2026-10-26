import { cn } from '@/lib/cn';

export function Logo({ className, label }: { className?: string; label?: string }) {
  return (
    <span className={cn('inline-flex size-11 shrink-0 overflow-hidden rounded-full', className)}>
      <img
        src="/logos/logo_whitebg.png"
        alt={label ?? ''}
        width="256"
        height="256"
        className="size-full max-w-none scale-[1.62] object-contain"
      />
    </span>
  );
}
