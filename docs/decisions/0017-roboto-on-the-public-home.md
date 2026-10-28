# 0017. Roboto on the public home, with GoAlmeria's corners

- **Status:** Accepted
- **Date:** 2026-10-28

## Context

The public home is being reviewed against GoAlmeria and GoKawayan. Those apps
are Material, so they are set in Roboto, and their cards, search field, and
floating navigation use a handful of larger corners. [ADR 0016](./0016-forest-green-and-gold.md)
keeps Plus Jakarta Sans as the only family, because a second font is another
download. [ADR 0015](./0015-one-radius-for-every-box.md) keeps every box at 8px.
Leaving the home on those rules makes the review about the typeface and the
corners instead of the municipality's own content.

## Decision

The public home, and only that screen, is set in Roboto. It is self-hosted
from Fontsource, weights 400, 500, 600, 700, and 800, and applied with the
`.ui-roboto` class. Its search field, cards, and floating navigation use the
GoAlmeria corners (16, 18, 24, and 34px) and fully round controls where
GoAlmeria does.

Plus Jakarta Sans remains the family everywhere else. The 8px radius remains
the rule for every other screen, including the primitives in
`frontend/src/components/ui/`. Forest green and gold are unchanged.

## Alternatives considered

**Keep Jakarta and 8px on the home.** One family and one radius, and a smaller
first load. It loses because this screen exists so people can compare it with
the Flutter apps, and a different face or a tighter corner makes that
comparison about the kit.

**Replace Jakarta with Roboto for the whole product.** One family again, and
the home would not be a special case. It loses because the rest of the product
is not that review, and ADR 0016 already settled Jakarta for it.

## Consequences

The home's first visit downloads Roboto as well as Jakarta, because both are
imported from `frontend/src/index.css`. Screens that never use `.ui-roboto`
still pay for those font files. The home is also the one place a new control
may use a corner other than 8px; copying one of those classes onto a product
screen is a mistake, not a precedent.
