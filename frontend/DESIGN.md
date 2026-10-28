# One Kawayan — design system

This file is the rules a specimen page cannot show: when to use what, and what
not to do. Tokens are in `src/styles/theme.css`. See
[ADR 0006](../docs/decisions/0006-theme-static-tokens.md).

---

## Where things live

| File | Holds |
|---|---|
| `src/styles/theme.css` | Every token. Colour, type scale, radius, elevation, easing. |
| `src/styles/base.css` | Element defaults, focus treatment, `.u-*` helpers. |
| `src/styles/motion.css` | Keyframes, interaction classes, reduced-motion handling. |
| `src/components/ui/` | Primitives. Import from `@/components/ui`. |

`@theme static` emits every token to `:root`. Dropping `static` makes
`var(--color-slate-950)` resolve to nothing, with no build error.

---

## Identity

**Type.** Plus Jakarta Sans for everything a person reads
([ADR 0016](../docs/decisions/0016-forest-green-and-gold.md),
[ADR 0014](../docs/decisions/0014-self-hosted-variable-fonts.md)).
One family, except the public home, which is Roboto
([ADR 0017](../docs/decisions/0017-roboto-on-the-public-home.md)).
`.u-display` is Jakarta at weight 700. Page titles are 700,
section titles 600, body 400, supporting lines 500.

Size is chosen at the call site: display `text-5xl` / `text-6xl` · h1
`text-4xl` · h2 `text-3xl` · h3 `text-xl` / `text-2xl` · body `text-md` · UI
`text-base` · caption `text-xs`. Body copy and form fields stay at `text-md`
(16px).

**Palette — forest green and gold.** Sampled from the municipal seal.
Neutrals are the warm `slate` ramp. `green` step 700 is the seal green
(`#0F452B`). `gold` step 500 is the seal gold (`#FAC247`) and is a fill only:
white and cream both fail on it, so a gold fill uses `text-on-accent`. These
replace Tailwind's own ramps of the same names.

---

## Rules

**Colour**

- `gold-500` is a fill, not text. Filled gold buttons use `accent-solid` with
  `text-on-accent`. Errors use `danger`, which is a separate red on purpose.
- Status is never colour alone. Pair it with an icon or a word.
- Text on white uses steps 600–700.

**Type**

- Headings inherit the display face and no size.
- Do not override the scale's line-height or tracking.
- `text-base` (15px) is UI. `text-md` (16px) is reading copy. Do not mix them
  in one block.

**Space**

- Page gutters come from `--gutter`. A full-height screen uses `min-h-page`,
  not `min-h-dvh`, so a staging banner can occupy `--staging-banner-h`.

**Radius and elevation**

- One radius, 8px, on every box
  ([ADR 0015](../docs/decisions/0015-one-radius-for-every-box.md)).
  The public home is the exception
  ([ADR 0017](../docs/decisions/0017-roboto-on-the-public-home.md)).
  `rounded-full` is for avatars, dots, and spinners only.
- Prefer a hairline to a shadow. Stop at `shadow-lg` for anything in the page.
  `shadow-xl` is for overlays. Shadows are ink-tinted, never neutral black.

**Components**

- `Button` variants are roles. `primary` is the seal green. `accent` is the
  gold fill with a dark label, for the one call to action a screen exists for.
  `secondary` is a green outline. `danger` destroys. `inverse` sits on a green
  surface. One primary action visible in a view.
- Every size is 44px on a touch screen. `sm` drops to 36px only with
  `pointer-fine`, so a phone in landscape stays 44px.
- A button that navigates is `ButtonLink`, not a `<button>` inside an `<a>`.

**Motion**

- 90–200ms for anything the user triggers. Transform and opacity only.
- Buttons use `interactive-press`. Hover lift is for cards that are themselves
  links.
- Everything collapses under `prefers-reduced-motion`.

**Screens**

- Design down to 320px wide, and for phones held in landscape (320–430px tall,
  the `short:` variant).
- A control that does not fit tightens or stacks. It does not wrap into a
  second line inside one pill.
- Compact sizes use `pointer-fine:`, never `sm:`. A phone in landscape is wider
  than `sm` and still a touch screen.
- Touch targets are at least 44px. A link that must stay visually small uses
  `.u-tap`.

**Copy**

- Do not machine-translate a string to preview a layout. English until a fluent
  speaker writes the other language. Layouts absorb longer text: no fixed-width
  text boxes, no truncation on anything load-bearing, checked at 360px.

**Theme**

- Light and dark follow `prefers-color-scheme` through `light-dark()` on the
  tokens. **Never** add a Tailwind `dark:` variant in a component. If one theme
  looks wrong, fix the token.
- A modal scrim uses `scrim`, never `ink`. `ink` is the text colour and inverts
  with the theme.

**Accessibility**

- One focus treatment, defined in `base.css`. Do not add a per-component ring.

---

## Extending it

Add a token before adding a one-off value. If a screen needs something the
system cannot express, the system is what should change.

**Never interpolate a class name.** `` `bg-${name}-500` `` generates nothing.
Write the full class, or read `var(--token)`.
