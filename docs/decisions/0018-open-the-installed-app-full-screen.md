# 0018. Open the installed app full screen

- **Status:** Superseded by [0019](./0019-colour-the-navigation-bar-from-the-manifest.md)
- **Date:** 2026-10-29

## Context

On Android, the installed app opened in `standalone` mode, with the phone's
status bar at the top and its navigation bar at the bottom. The page can
recolour the status bar through `theme-color`, and #15 and #17 made it continue
the home banner. The navigation bar takes its colour from the manifest
(`#0f452b`), which Android fixes at install. The page cannot change it, so a
green strip sat under the app in both themes. Adding `viewport-fit=cover` (#15)
did not remove it on the phone it was tested on.

The aim is an app that looks like it fills the screen, not a page framed by two
bars.

## Decision

The manifest sets `"display": "fullscreen"`. The installed app opens with both
phone bars hidden. A swipe in from the top or bottom edge shows them briefly.

The install check in `frontend/src/pages/install.ts` treats both `fullscreen`
and `standalone` as the installed app (`INSTALLED_DISPLAY`). A browser that
cannot open an app full screen falls back to `standalone`, which matches the
old behaviour. A test ties that check to the manifest's display mode, so
changing one without the other fails.

## Alternatives considered

**Change the manifest colour to the dark page green.** The bars stay, and the
strip blends into the dark theme and the dark floating navigation. It loses
because the manifest holds one colour for both themes, so the light theme keeps
a dark strip under a cream page. The app still reads as framed.

**Keep `standalone` and rely on `viewport-fit=cover`.** Recent Chrome on recent
Android can draw the page under the navigation bar. It loses because it did not
on the phone that reported the strip. It also depends on the Chrome and Android
version, which the municipality cannot control.

## Consequences

The app fills the screen in both themes, with no strip to keep in step with the
page.

People lose the clock, battery and signal while the app is open, and need a
swipe to see them. For an app people open to check something quickly, that is
the real cost of this decision. Reverse it if residents say they miss the bar.

The status-bar colour work (`theme-bar.ts`) no longer shows in the installed
app on Android. It still colours the browser bar when the site is open in a
browser tab, and the bar on any device that falls back to `standalone`, so it
stays.

Installed copies only pick up the change when Chrome refreshes the app from the
manifest. Chrome checks when the app is opened, about once a day, so a phone
can take a day or two. Reinstalling applies it at once.

With the bars hidden, a phone with a camera cutout lets the page reach the top
edge. The screens already pad their tops with `env(safe-area-inset-top)` and
the floating navigation pads its bottom with `env(safe-area-inset-bottom)`, so
nothing sits under the cutout or the gesture area.

A desktop browser put into full screen with F11 may also match
`display-mode: fullscreen`, and show "Installed" on the install card. That is
harmless, and is accepted.
