# 0014. Self-hosted variable fonts

- **Status:** Accepted. Which families load is amended by [0016](./0016-forest-green-and-gold.md): Plus Jakarta Sans only, and by [0017](./0017-roboto-on-the-public-home.md) for the public home.
- **Date:** 2026-10-26

## Context

A font CDN is one more DNS lookup and TLS handshake. On a slow connection that
handshake is a large part of the cost of the first paint. The two families in
[ADR 0013](./0013-navy-and-red-identity.md) are the whole budget.

## Decision

Plus Jakarta Sans is self-hosted through Fontsource, variable, weight axis
only. It is imported from `frontend/src/index.css`. No other family is added.
Fraunces, from the original decision, is no longer imported
([ADR 0016](./0016-forest-green-and-gold.md)).

## Alternatives considered

**Google Fonts or another CDN.** One less file in the repo, and one more
connection on the first visit.

**A third display face.** Another download for a distinction the two families
already make.

## Consequences

Fontsource splits by unicode range, so a browser rendering Latin text does not
download every subset. A new family is a decision record, not an import.
