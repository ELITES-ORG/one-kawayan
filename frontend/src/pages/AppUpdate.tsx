import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { applyUpdate, latestBuildId, UPDATE_CHECK_MS, updateAction, updateIsReady } from '@/pages/app-update';

/** Looks for a new deploy and offers to reload into it. A backgrounded app reloads on its own. */
export function AppUpdateNotice() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const look = async () => {
      const latest = await latestBuildId();
      if (cancelled) return;
      const action = updateAction(updateIsReady(__BUILD_ID__, latest), document.visibilityState === 'visible');
      if (action === 'reload') applyUpdate();
      if (action === 'ask') setReady(true);
    };

    void look();
    const onVisibility = () => void look();
    document.addEventListener('visibilitychange', onVisibility);
    const timer = window.setInterval(() => void look(), UPDATE_CHECK_MS);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearInterval(timer);
    };
  }, []);

  if (!ready) return null;

  return (
    <div className="ui-roboto pointer-events-none fixed inset-x-0 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-30 flex justify-center px-4">
      <div
        role="status"
        className="pointer-events-auto flex w-full max-w-[480px] items-center justify-between gap-3 rounded-[16px] bg-surface px-4 py-3 text-ink shadow-xl"
      >
        <p className="text-base leading-snug font-semibold">A new version is ready.</p>
        <Button type="button" size="sm" onClick={() => applyUpdate()}>
          Update
        </Button>
      </div>
    </div>
  );
}
