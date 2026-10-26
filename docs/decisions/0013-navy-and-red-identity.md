# 0013. Navy and red, Fraunces for headings

- **Status:** Superseded by [0016](./0016-forest-green-and-gold.md)
- **Date:** 2026-10-26

## Context

A default Tailwind palette is a decision nobody made. Neutral-black shadows and
a sans-serif everywhere read as a template.

## Decision

Neutrals are a cool slate. Primary is a deep navy (`#032B61` at navy step 700).
The accent is a signal red for calls to action and badges, not for status.
Status uses `danger`, which sits deeper so the two reds are not confused.

Fraunces carries headings and the wordmark. Plus Jakarta Sans carries UI and
body. Two families is the budget.

Colour is authored in OKLCH. Each colour that differs between themes is one
`light-dark()` declaration. Do not add a Tailwind `dark:` variant in a
component. If a theme looks wrong, fix the token.

## Alternatives considered

**One family.** Simpler, and the headings do not carry a separate voice.

**Stock Tailwind slate and red.** They are not these ramps. The theme replaces
them, so a stock class name is not the stock colour.

## Consequences

The ramps live in `frontend/src/styles/theme.css`. Red-500 is for decoration
and large text only. Filled buttons use `accent-solid`.
