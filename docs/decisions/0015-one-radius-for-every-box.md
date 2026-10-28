# 0015. One radius for every box

- **Status:** Accepted. The public home's corners are amended by [0017](./0017-roboto-on-the-public-home.md).
- **Date:** 2026-10-26

## Context

A scale of radii looks like a system and behaves like five decisions. Buttons,
inputs, cards, and dialogs end up with different corners because each screen
picked its own.

## Decision

One radius, 8px, on every chip, button, input, card, panel, and dialog. The
names `rounded-xs` through `rounded-2xl` all resolve to it.

`rounded-full` is only for things that are round by nature: avatars, dots,
spinners. Never a button, chip, badge, or icon button.

## Alternatives considered

**A radius scale.** More expressive, and the thing that makes a screen look
assembled from three kits.

## Consequences

A new corner radius is a change to the token, not a one-off class. Shadows stay
ink-tinted. Prefer a hairline to a shadow. `shadow-xl` is for overlays only.
