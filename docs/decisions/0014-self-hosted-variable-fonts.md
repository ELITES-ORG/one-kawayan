# 0014. Self-hosted variable fonts

- **Status:** Accepted. Which families load is amended by [0016](./0016-forest-green-and-gold.md): Plus Jakarta Sans only.
- **Date:** 2026-10-26

## Context

A font CDN is one more DNS lookup and TLS handshake. On a slow connection that
handshake is a large part of the cost of the first paint. The two families in
[ADR 0013](./0013-navy-and-red-identity.md) are the whole budget.

## Decision

Fraunces and Plus Jakarta Sans are self-hosted through Fontsource, variable,
weight axis only (Fraunces also loads its optical-size axis). They are imported
from `frontend/src/index.css`. No other family is added.

## Alternatives considered

**Google Fonts or another CDN.** One less file in the repo, and one more
connection on the first visit.

**A third display face.** Another download for a distinction the two families
already make.

## Consequences

Fontsource splits by unicode range, so a browser rendering Latin text does not
download every subset. A new family is a decision record, not an import.
