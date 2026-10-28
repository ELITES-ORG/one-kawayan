import { useEffect, useLayoutEffect, useState, type CSSProperties } from 'react';
import { Logo } from '@/components/icons/Logo';
import { splashCanLeave, splashHoldMs, splashLogoDelayMs } from '@/pages/splash-timing';

const NAME = 'OneKawayan';

type Phase = 'visible' | 'leaving' | 'gone';

export function Splash() {
  const [phase, setPhase] = useState<Phase>('visible');
  // The description does not animate, so a fallback face would show and then
  // jump when Roboto arrives. It stays hidden until that face can paint.
  const [copyReady, setCopyReady] = useState(false);

  useLayoutEffect(() => {
    if (phase === 'gone') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    let cancelled = false;
    const showCopy = () => {
      if (!cancelled) setCopyReady(true);
    };
    if (document.fonts.check('14px Roboto')) showCopy();
    else void document.fonts.ready.then(showCopy);
    return () => {
      cancelled = true;
      document.body.style.overflow = previous;
    };
  }, [phase]);

  useEffect(() => {
    let cancelled = false;
    let timer = 0;
    const started = performance.now();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdMs = splashHoldMs(reduced);

    const fontsReady = document.fonts.ready.then(() => true);
    const windowLoaded =
      document.readyState === 'complete'
        ? Promise.resolve(true)
        : new Promise<boolean>((resolve) => {
            window.addEventListener('load', () => resolve(true), { once: true });
          });

    void Promise.all([fontsReady, windowLoaded]).then(([fonts, loaded]) => {
      const elapsedMs = performance.now() - started;
      const wait = splashCanLeave({ fontsReady: fonts, windowLoaded: loaded, elapsedMs, holdMs })
        ? 0
        : Math.max(0, holdMs - elapsedMs);
      timer = window.setTimeout(() => {
        if (!cancelled) setPhase('leaving');
      }, wait);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'leaving') return;
    const timer = window.setTimeout(() => setPhase('gone'), 700);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === 'gone') return null;

  return (
    <div
      className={`ui-roboto fixed inset-0 z-40 flex flex-col items-center justify-center bg-primary px-6 text-center${phase === 'leaving' ? ' splash-leave' : ''}`}
      role="status"
      aria-live="polite"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && event.animationName === 'bk-splash-leave') {
          setPhase('gone');
        }
      }}
    >
      <div
        className="splash-logo mb-3"
        style={{ '--splash-logo-delay': `${splashLogoDelayMs(NAME.length)}ms` } as CSSProperties}
      >
        <Logo className="size-20" />
      </div>
      <p
        className="splash-name text-3xl font-extrabold whitespace-nowrap text-gold-500 min-[400px]:text-4xl"
        aria-label={NAME}
      >
        {[...NAME].map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            aria-hidden="true"
            style={{ '--splash-i': index } as CSSProperties}
          >
            {letter}
          </span>
        ))}
      </p>
      <p
        className={`u-scheme-dark mt-2.5 w-full text-center text-[14px] leading-[1.35] text-ink/80 min-[460px]:mt-3 min-[460px]:text-[16px]${copyReady ? '' : ' invisible'}`}
      >
        <span className="block whitespace-nowrap">Municipal services, local news,</span>
        <span className="block whitespace-nowrap min-[380px]:hidden">and emergency access.</span>
        <span className="hidden whitespace-nowrap min-[380px]:block">
          and emergency access in one place.
        </span>
      </p>
    </div>
  );
}
