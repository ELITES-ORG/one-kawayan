# 0019. Colour the navigation bar from the manifest, in the dark page green

- **Status:** Accepted
- **Date:** 2026-10-29

## Context

[ADR 0018](./0018-open-the-installed-app-full-screen.md) opened the installed
app full screen, to hide a green strip under it on Android. Hiding the status
bar went too far: #17 had already made that bar continue the home banner, and
it looked right. The strip at the bottom was the only problem.

That strip is the Android navigation bar. Chromium colours it for an installed
app in `WebappIntentDataProvider.getNavigationBarColor()`. When the manifest has
a `theme_color`, the bar uses it. When it has none, the bar is left to the
platform default. Nothing on the page changes it. `theme-color` meta tags and
`viewport-fit=cover` did not move it. The manifest's `theme_color` was the seal
green (`#0f452b`), so the strip was seal green in both themes.

## Decision

The app opens in `standalone` again. The manifest's `theme_color` is
`#0c1a12`, the dark theme's page colour (`--color-paper`, dark). The
`background_color` stays the seal green, because Android paints the launch
splash with it, and the app's own splash is seal green.

## Alternatives considered

**Full screen (ADR 0018).** It removes the strip by hiding both bars. It lost
because it also hides the status bar, the clock and the battery, and the status
bar was already right.

**Drop `theme_color`.** The bar would take the platform default. That default
is up to the phone maker and the phone's own theme, so nobody could say what it
would look like.

**A light colour, such as the light page.** It disappears under the light
theme but is a bright strip under the dark theme. The floating navigation that
sits on the strip is dark in both themes, so a dark strip suits it better.

**A separate colour for dark mode.** Chromium reads a dark theme colour for
installed apps from an experimental manifest field. It follows the phone's dark
mode, not the theme chosen in the app, so it would pick the wrong colour
whenever the two disagree.

## Consequences

Under the dark theme, the strip is the page colour and disappears. Under the
light theme it is a dark strip under the dark floating navigation, not a green
one.

Before the page loads its own colour, the status bar briefly takes the manifest
`theme_color`, so a launch shows a dark status bar over the green splash until
the splash sets its own.

Installed copies pick the colour up only when Chrome refreshes the app from the
manifest: about once a day when the app is opened, or at once on a reinstall.
A phone that got the full-screen manifest from ADR 0018 returns to standalone
the same way.

The status-bar colour work in `theme-bar.ts` applies again in the installed
app.
