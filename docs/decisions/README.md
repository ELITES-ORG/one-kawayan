# Decision records

Short records of decisions with consequences, and the reasoning behind them.

They exist so nobody re-litigates a settled question from scratch — and so that
when a decision *should* be revisited, the reasoning that produced it is visible
rather than guessed at.

---

## Status

| Status | Means |
|---|---|
| **Accepted** | Decided and reflected in the code today |
| **Proposed** | Decided in principle, not yet built. Still open to change |
| **Superseded** | Replaced. Links to what replaced it. **Never deleted** |

A superseded record keeps its reasoning. "We tried X and moved to Y because Z"
is more valuable than a record that only shows Y.

---

## Writing one

Copy [`_template.md`](./_template.md). Keep it under a page.

Write a record when a choice would be expensive to reverse, when you rejected a
reasonable alternative, or when the decision will look wrong to someone without
the context. Do not write one for choices with an obvious default.

Number sequentially. Never renumber.

---

## Log

| # | Decision | Status |
|---|---|---|
| [0001](./0001-record-architecture-decisions.md) | Record architecture decisions | Accepted |
| [0002](./0002-pern-with-client-rendered-spa.md) | PERN with a client-rendered SPA | Accepted |
| [0003](./0003-migrations-over-db-push.md) | Generated migrations over `db:push` | Accepted |
| [0004](./0004-modular-monolith-architecture.md) | Modular monolith with feature slices | Accepted |
| [0005](./0005-versioned-api-prefix.md) | Versioned API prefix from day one | Accepted |
| [0006](./0006-theme-static-tokens.md) | `@theme static` for design tokens | Accepted |
| [0007](./0007-testing-strategy.md) | Tests run against a real database | Accepted |
| [0008](./0008-one-definition-of-an-api-shape.md) | One definition of an API shape | Accepted |
| [0009](./0009-ai-attribution-is-blocked-by-a-hook-not-a-rule.md) | AI attribution is blocked by a check, not by a rule | Accepted |
| [0010](./0010-main-is-staging-production-is-a-branch.md) | `main` is staging; production is a branch | Accepted |
| [0011](./0011-only-reyxdz-merges-and-releases.md) | Only reyxdz merges and releases | Accepted |
| [0012](./0012-pull-requests-merge-by-squash-only.md) | Pull requests merge by squash only | Accepted |
| [0013](./0013-navy-and-red-identity.md) | Navy and red, Fraunces for headings | Superseded by 0016 |
| [0014](./0014-self-hosted-variable-fonts.md) | Self-hosted variable fonts | Accepted |
| [0015](./0015-one-radius-for-every-box.md) | One radius for every box | Accepted |
| [0016](./0016-forest-green-and-gold.md) | Forest green and gold, one typeface | Accepted |
| [0017](./0017-roboto-on-the-public-home.md) | Roboto on the public home, with GoAlmeria's corners | Accepted |
| [0018](./0018-open-the-installed-app-full-screen.md) | Open the installed app full screen | Accepted |
