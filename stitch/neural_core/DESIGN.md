# Design System Specification: The Neural Interface

## 1. Overview & Creative North Star
**Creative North Star: The Synthetic Archive**

This design system is not a website; it is a high-fidelity terminal interface into a creative mind. We are moving away from the "template" look of modern web design to embrace **Organic Technocracy**. The goal is to create a digital experience that feels like a high-end developer dashboard or a classified sci-fi HUD. 

To achieve this, we break the rigid, centered grid. We utilize intentional asymmetry, where technical data points (labels) are juxtaposed against large, aggressive display typography. We treat the viewport as a canvas for a "Modular Machine"—overlapping glass panels, glowing data streams, and sharp, aggressive geometry that suggests precision and cutting-edge capability.

---

## 2. Colors & Surface Architecture
The palette is rooted in the void—a deep `surface` (#0e1419) that allows the neon accents to vibrate.

### The "No-Line" Rule
For structural sectioning, **1px solid borders are strictly prohibited.** We define boundaries through:
1.  **Tonal Shifts:** Placing a `surface_container_low` section against a `surface` background.
2.  **Luminous Terminals:** Using soft, teal-tinted glows to "bloom" the edges of a container rather than boxing it in.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of glass.
*   **Base:** `surface` (#0e1419).
*   **Secondary Content Areas:** `surface_container_low`.
*   **Floating Panels/Modals:** `surface_container_highest` with a backdrop blur of 16px to 24px.
*   **Nesting:** Always move from darker to lighter as you move "up" the Z-axis. A card on a `surface_container_low` section must use `surface_container_high`.

### The "Glass & Gradient" Rule
To add "soul" to the digital coldness:
*   **Glassmorphism:** Use `surface_variant` at 40% opacity with `backdrop-filter: blur(20px)`. This creates a frosted-tech look.
*   **Signature Gradients:** Use a linear gradient from `primary_container` (#00f2ff) to `secondary` (#9bd0cf) at a 135-degree angle for hero CTAs and primary interaction points.

---

## 3. Typography
Typography is our primary tool for expressing the "Cyberpunk Editorial" vibe.

*   **Display & Headlines (Space Grotesk):** This is our "Technical Authority." Use `display-lg` for hero statements. The wide apertures and geometric construction of Space Grotesk should be leaned into—treat these as architectural elements.
*   **Body (Manrope):** Our "Human Connection." Manrope provides high legibility against dark backgrounds. Use `body-lg` for narrative text and `body-sm` for technical descriptions.
*   **Hierarchy Note:** Use `label-md` in all-caps with 0.1em letter spacing for metadata (e.g., "PROCESSING TIME" or "PROJECT_CODE: 004"). This mimics a system readout.

---

## 4. Elevation & Depth
Depth in this system is achieved through light and density, not drop shadows.

*   **Tonal Layering:** Avoid shadows for static cards. Use the difference between `surface_container_lowest` and `surface_container_low` to create a "recessed" or "elevated" feel.
*   **Ambient Shadows:** For floating glass panels, use a glow-shadow. The shadow color should be `primary_container` at 5% opacity with a 40px blur. This creates a "backlit screen" effect.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline_variant` at 15% opacity. It should be barely perceptible—a "whisper" of a line.
*   **Geometric Framing:** Referencing the visual source, use "Brackets" at the corners of high-importance containers using `primary_fixed_dim`. These are sharp, 0px-radius L-shapes that frame the content.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary_container` (#00f2ff). Text in `on_primary_fixed`. Hard 0px corners. Hover state: add a `0 0 15px #00f2ff` outer glow.
*   **Secondary:** Ghost style. `outline` border at 30% opacity. Text in `primary`. Hover state: background shifts to `surface_container_high` with a subtle teal inner glow.
*   **Tertiary:** Text-only in `label-md`. Use `primary` color. Animate an underline from center-out on hover.

### Cards & Lists
*   **The "No Divider" Rule:** Never use horizontal lines to separate list items. Use 24px-32px of vertical `spacing` or alternating background tints between `surface_container_low` and `surface_container_lowest`.
*   **Geometric Accents:** Cards should feature a "clipped corner" look or the decorative corner brackets mentioned in the elevation section.

### Input Fields
*   **Styling:** Background `surface_container_lowest`. No bottom border. Instead, use a subtle `outline_variant` at 20% opacity.
*   **Focus State:** The border glows in `primary_container`, and a tiny "scanning" line (1px tall) should animate across the top.

### Specialized Components: "Data Tickers"
*   Incorporate a `label-sm` scrolling text marquee at the bottom of the screen or header, using `on_surface_variant`. This adds to the "live system" aesthetic.

---

## 6. Do's and Don'ts

### Do
*   **Do** embrace the **0px roundedness scale**. Every edge must be sharp and precise.
*   **Do** use asymmetrical layouts. If an image is on the right, let the text on the left be offset vertically to create visual tension.
*   **Do** use "Tech Flourishes." Add small decorative plus-signs (+) or coordinate grids (dots) in the background using `outline_variant` at 10% opacity.

### Don't
*   **Don't** use standard grey shadows. They look muddy on deep navy backgrounds. Use teal-tinted glows instead.
*   **Don't** use generic icons. Use high-tech, thin-stroke (1pt) SVG icons that feel like architectural symbols.
*   **Don't** center everything. Centering is for templates. We are building a custom-engineered dashboard; utilize the full width and vary the column starts.
*   **Don't** use high-opacity borders. They "close" the design. Keep it open, breathable, and luminous.

---
**Director's Closing Note:** 
Junior designers often fear the dark. Do not fill the negative space with "stuff." Let the `background` breathe. The tension between the vast dark voids and the razor-sharp neon accents is where the premium, high-end feel lives. Focus on the "glow" and the "glass"—the rest is just data.