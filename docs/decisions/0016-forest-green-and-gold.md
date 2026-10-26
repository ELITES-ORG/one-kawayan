# 0016. Forest green and gold, one typeface

- **Status:** Accepted
- **Date:** 2026-10-26

## Context

The municipal seal is a deep green ring (`#0F452B`) with gold lettering
(`#FAC247`) on a cream field. [ADR 0013](./0013-navy-and-red-identity.md) had
set a navy and red identity, and a display serif, before that seal was the
reference. The people using this app will read it on small, often low-end
phones. A second font is another download, and a display serif is harder to
read at the sizes a phone actually uses.

## Decision

Primary is the seal green. The accent is the seal gold, and it is a fill: the
label on it is dark green (`--color-on-accent`), because white and cream both
fail on that gold. Neutrals are a warm stone, and the page is a light cream
rather than pure white.

Plus Jakarta Sans is the only family. It carries display type, headings, UI,
and body. Weights stay on the steps 400, 500, 600, and 700. Body copy and form
fields are 16px.

Status colours sit off both brand hues, so a success green is not the seal and
a warning is not the gold. Status is still never colour alone.

This supersedes the palette and the typeface in ADR 0013. Self-hosting from
[ADR 0014](./0014-self-hosted-variable-fonts.md) stands; Fraunces is no longer
imported.

## Alternatives considered

**Keep Fraunces for large titles only.** A second voice, and a second file on
the first load, for a line that has to be read quickly.

**Use the poster yellow-green as the page background.** It is the fiesta
artwork. As an app background it tires the eye. Cream carries the same warmth
at a lower chroma.

**Gold as a text colour.** It is the seal's second colour, and it fails
contrast on cream. It stays a fill and a small mark.

## Consequences

Tokens live in `frontend/src/styles/theme.css`. The ramps are named `green` and
`gold`. `gold-500` is not for text. A gold button uses `text-on-accent`.
