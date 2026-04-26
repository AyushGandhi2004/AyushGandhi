# Build Prompt: Ayush Gandhi — Personal Portfolio Website

You are building a complete, production-ready, error-free personal portfolio website for **Ayush Gandhi**, a full-stack developer and AI enthusiast who also pursues photography as a hobby. The design targets the aesthetic of **Apple / Vercel / Linear** — minimal, clean, typography-driven, with high-quality subtle animations.

Read this entire document before writing any code. Every section is important. Do not skip anything. Do not assume — follow these instructions precisely.

---

## 1. TECH STACK

| Tool | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool + dev server |
| **TypeScript** | Strict mode, no `any` |
| **Tailwind CSS v4** | Styling (use `@theme` directive in CSS, not `tailwind.config.js`) |
| **GSAP 3 + ScrollTrigger** | Scroll-linked animations, pinned sections, timeline sequences |
| **Framer Motion** (the `motion` package) | UI-level animations: hover states, presence transitions, tagline swap, nav interactions |
| **Lenis** | Smooth scrolling (integrates with GSAP ScrollTrigger) |
| **React Router v6** | Routing (`/` for portfolio, `/photography` as placeholder) |
| **@fontsource packages** | Self-hosted fonts (no Google Fonts CDN) |

### Installation

```bash
npm create vite@latest portfolio -- --template react-ts
cd portfolio
npm install react-router-dom gsap @gsap/react motion lenis tailwindcss @tailwindcss/vite typescript
npm install @fontsource/inter @fontsource-variable/inter @fontsource/instrument-serif @fontsource/jetbrains-mono
```

### Lenis + GSAP Integration

Set up Lenis in `App.tsx` or a dedicated provider. Connect it to GSAP's ScrollTrigger so they work together:

```ts
// In a useEffect at the app root:
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

This is critical — without this integration, ScrollTrigger pinning and Lenis will fight each other.

---

## 2. PROJECT STRUCTURE

Use this exact structure. Every section and every animation-heavy subcomponent gets its own file. No monolithic components.

```
src/
├── config/
│   ├── site.config.ts          # ALL text content: hero, taglines, about, contact, nav labels
│   ├── projects.config.ts      # Array of project objects (title, description, tech, link)
│   ├── theme.config.ts         # Color tokens, motion durations/easings
│   └── fonts.config.ts         # Active font pairing + alternatives
├── styles/
│   └── globals.css             # Tailwind v4 @import, @theme block, font-face, grain overlay, global resets
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx      # Top nav bar (DP, center links, Photography link)
│   │   ├── GrainOverlay.tsx    # Fixed SVG noise overlay
│   │   ├── SectionHeading.tsx  # Reusable large centered heading with reveal animation
│   │   └── SectionDivider.tsx  # Thin horizontal line that expands on scroll
│   ├── hero/
│   │   ├── Hero.tsx            # Section wrapper + parallax setup
│   │   ├── HeroTitle.tsx       # "Hey! I'm / Ayush Gandhi" with split reveal
│   │   ├── TaglineLoop.tsx     # Rotating taglines with typewriter effect
│   │   └── ScrollIndicator.tsx # "↓ Scroll to explore" with floating motion
│   ├── about/
│   │   ├── About.tsx           # Section wrapper
│   │   ├── AboutContent.tsx    # Progressive paragraph reveal on scroll
│   │   └── TechStack.tsx       # Tech icons/logos grid with hover effects
│   ├── projects/
│   │   ├── Projects.tsx        # Pinned section wrapper with ScrollTrigger
│   │   ├── ProjectScrollTrack.tsx  # Diagonal scroll track (horizontal + vertical offset)
│   │   └── ProjectCard.tsx     # Individual project card with internal parallax
│   ├── contact/
│   │   ├── Contact.tsx         # Section wrapper
│   │   ├── ContactList.tsx     # Social links with logos
│   │   └── ClosingLine.tsx     # Final statement
│   └── ui/
│       └── ShimmerText.tsx     # Reusable light reflection / shimmer effect on text
├── hooks/
│   ├── useGsapContext.ts       # GSAP context wrapper for React (handles cleanup)
│   ├── usePrefersReducedMotion.ts  # Accessibility: detect reduced motion preference
│   └── useLenis.ts             # Lenis instance provider hook
├── pages/
│   ├── Home.tsx                # Composes all sections in order
│   └── Photography.tsx         # Placeholder: "Coming soon" with back link
├── App.tsx                     # Router + Lenis setup + ScrollTrigger init
└── main.tsx                    # Entry point, font imports
```

**Rule:** If a component exceeds ~120 lines or has more than one distinct animation concern, split it into subcomponents.

---

## 3. CONFIG-DRIVEN ARCHITECTURE

**Every piece of text, every color, every font, every project, and every motion value must live in config files — never hardcoded in components.** The owner wants to change text, colors, fonts, and data without touching component files.

### `site.config.ts`

```ts
export const siteConfig = {
  nav: {
    dpImage: '/dp.jpg', // Place image in /public
    links: [
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
    photographyLabel: 'Photography',
    photographyHref: '/photography',
  },
  hero: {
    greeting: "Hey! I'm",
    name: 'Ayush Gandhi',
    taglines: [
      'Building scalable systems',
      'Designing clean experiences',
      'Exploring visual storytelling',
    ],
    taglineInterval: 2800, // ms between tagline swaps
    scrollIndicatorText: 'Scroll to explore',
  },
  about: {
    heading: 'About Me',
    paragraphs: [
      {
        text: "I'm Ayush Gandhi, a software developer from India who enjoys building intelligent and scalable digital products. My work sits at the intersection of full-stack development and artificial intelligence, where I design systems that are not just functional but also adaptive and smart. From integrating AI models to creating agent-driven workflows, I focus on building solutions that solve real-world problems.",
        keywords: ['intelligent', 'scalable', 'artificial intelligence', 'agent-driven workflows'],
      },
      {
        text: "I enjoy staying on the cutting edge of technology and continuously evolving with it. I'm someone who believes technology evolves fast—and so should we. I'm constantly learning, experimenting, and refining my skills to stay aligned with the latest advancements in AI and software development.",
        keywords: ['cutting edge', 'learning', 'experimenting'],
      },
      {
        text: 'Full stack developer focused on clean architecture.',
        keywords: ['clean architecture'],
      },
      {
        text: "When I'm not coding, you'll usually find me behind a camera capturing birds, wildlife, and nature, or spending time with friends playing sports and enjoying music.",
        keywords: ['camera', 'birds', 'wildlife', 'nature'],
      },
    ],
    techStack: [
      { name: 'React', icon: 'react' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'GSAP', icon: 'gsap' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'LangChain', icon: 'langchain' },
      { name: 'LangGraph', icon: 'langgraph' },
      { name: 'Redis', icon: 'redis' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Python', icon: 'python' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'C++', icon: 'cplusplus' },
    ],
  },
  contact: {
    heading: 'Contact',
    items: [
      { label: 'Email', value: 'hello@ayushgandhi.com', href: 'mailto:hello@ayushgandhi.com', icon: 'email' },
      { label: 'Phone', value: '+91 00000 00000', href: 'tel:+910000000000', icon: 'phone' },
      { label: 'GitHub', value: '@ayushgandhi', href: 'https://github.com/ayushgandhi', icon: 'github' },
      { label: 'LinkedIn', value: 'Ayush Gandhi', href: 'https://linkedin.com/in/ayushgandhi', icon: 'linkedin' },
      { label: 'Instagram', value: '@ayushgandhi', href: 'https://instagram.com/ayushgandhi', icon: 'instagram' },
      { label: 'X (Twitter)', value: '@ayushgandhi', href: 'https://x.com/ayushgandhi', icon: 'x' },
    ],
    closingLine: "Let's build something meaningful.",
  },
} as const;
```

> **All contact values, DP image path, and social links are placeholders.** The owner will fill them in. Do not invent real data.

### `projects.config.ts`

```ts
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  href: string;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'AI Agent Platform',
    description: 'An intelligent agent orchestration system built with LangGraph for automating complex workflows.',
    tech: ['Python', 'LangGraph', 'FastAPI', 'Redis'],
    href: '#',
  },
  {
    id: 'project-2',
    title: 'Real-time Dashboard',
    description: 'A live monitoring dashboard with WebSocket feeds and interactive data visualizations.',
    tech: ['React', 'Node.js', 'Socket.io', 'D3.js'],
    href: '#',
  },
  {
    id: 'project-3',
    title: 'Smart Search Engine',
    description: 'Semantic search system powered by vector embeddings and RAG architecture.',
    tech: ['Python', 'LangChain', 'Pinecone', 'FastAPI'],
    href: '#',
  },
  {
    id: 'project-4',
    title: 'Portfolio CMS',
    description: 'A headless CMS for managing portfolio content with real-time preview.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    href: '#',
  },
  {
    id: 'project-5',
    title: 'Wildlife Photo Gallery',
    description: 'A performance-optimized image gallery with lazy loading and masonry layout.',
    tech: ['React', 'GSAP', 'Cloudinary', 'Tailwind'],
    href: '#',
  },
];
```

> These are placeholder projects. The owner will replace them. Keep them realistic so the site looks complete during development.

### `theme.config.ts`

```ts
export const theme = {
  colors: {
    bg: '#000000',
    bgAlt1: '#0A0A0A',
    bgAlt2: '#111111',
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A0A0',
    accent: '#E5E5E5',
  },
  motion: {
    durationFast: 0.6,
    durationBase: 0.9,
    durationSlow: 1.2,
    easeOut: 'power2.out',
    easeInOut: 'power2.inOut',
    stagger: 0.08,
  },
} as const;
```

These color tokens MUST also be defined as CSS custom properties in `globals.css` via Tailwind v4's `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-bg: #000000;
  --color-bg-alt1: #0A0A0A;
  --color-bg-alt2: #111111;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A0A0A0;
  --color-accent: #E5E5E5;
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-serif: 'Instrument Serif', serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

Both GSAP (runtime JS) and Tailwind utilities must reference the same color values. The `theme.config.ts` is the source of truth; mirror its values in `@theme`.

### `fonts.config.ts`

```ts
export type FontPairing = 'inter-instrument' | 'inter-only' | 'geist';

export const activeFontPairing: FontPairing = 'inter-instrument';

export const fontPairings = {
  'inter-instrument': {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    serif: "'Instrument Serif', serif",
    mono: "'JetBrains Mono', monospace",
  },
  'inter-only': {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    serif: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  'geist': {
    heading: "'Geist', sans-serif",
    body: "'Geist', sans-serif",
    serif: "'Instrument Serif', serif",
    mono: "'Geist Mono', monospace",
  },
} as const;
```

The `serif` font is used **only** for the hero name "Ayush Gandhi" and optionally the closing line. Everything else uses the heading/body sans-serif. Changing `activeFontPairing` should swap fonts site-wide (apply the resolved values to `--font-heading`, `--font-body`, `--font-serif`, `--font-mono` CSS vars at app initialization).

---

## 4. GLOBAL ELEMENTS

### 4.1 Grain Overlay (`GrainOverlay.tsx`)

- Fixed position, covers entire viewport, `pointer-events: none`, `z-index: 9999`.
- SVG `<feTurbulence>` noise filter, ~3–5% opacity, `mix-blend-mode: soft-light`.
- No external image — generate inline SVG.
- Fades in with the initial page load.

### 4.2 Section Dividers (`SectionDivider.tsx`)

- Thin horizontal line (1px height, `#E5E5E5` at 20% opacity).
- Centered, max-width ~120px.
- Animation: `scaleX: 0 → 1` when it enters the viewport, duration 0.8s, ease `power2.out`, `transform-origin: center`.
- Place between every section (Hero→About, About→Projects, Projects→Contact).

### 4.3 Smooth Scrolling (Lenis)

- Lenis handles smooth scroll globally.
- Connected to GSAP ticker as shown in Section 1.
- On mobile, reduce Lenis `lerp` to `0.15` for a slightly snappier feel.
- Disable Lenis entirely when `prefers-reduced-motion` is active.

### 4.4 Accessibility

- Semantic HTML: `<nav>`, `<main>`, `<section>` with `aria-label` on each.
- Keyboard-reachable interactive elements with visible focus rings (1px `#E5E5E5` outline, offset 4px).
- `alt` text on images from config.
- **`prefers-reduced-motion`:** when active, disable GSAP ScrollTrigger scrub/pin, replace all animations with instant opacity fades, disable Lenis, disable parallax. Use the `usePrefersReducedMotion` hook consistently.

---

## 5. SECTION-BY-SECTION IMPLEMENTATION

### 5.1 Page Load (0 → ~1s)

- `<body>` starts at `opacity: 0`.
- GSAP timeline: fade body to `opacity: 1` over 0.8s.
- Grain overlay fades in simultaneously.
- No content is visible until this completes — everything is staged behind this curtain.

---

### 5.2 Navigation (`Navigation.tsx`)

**Layout (desktop):**

```
[ DP ]                  About   Projects   Contact                   Photography →
```

- **Fixed position**, top of viewport, full width.
- Transparent background initially. After scrolling ~80px: add `backdrop-filter: blur(12px)` and a very subtle `border-bottom: 1px solid rgba(255,255,255,0.05)`.
- z-index above everything except grain overlay.

**Left — Profile Photo (DP):**
- Circular, ~36px diameter, 1px border `rgba(229,229,229,0.2)`.
- Entry: `opacity 0→1`, `scale 0.9→1`, duration 0.8s, delay 0.1s.

**Center — Nav Links (About / Projects / Contact):**
- Entry: staggered fade-in-up (`y: 12px → 0`, `opacity 0→1`, stagger 0.08s, starting at delay 0.3s).
- **Hover:** underline grows left → right (pseudo-element `scaleX 0→1`, `transform-origin: left`, duration 0.35s). Text color shifts `#A0A0A0 → #FFFFFF`.
- **Click:** smooth scroll to the target section using Lenis's `scrollTo` method (not native `scrollIntoView` — it conflicts with Lenis).

**Right — Photography Link:**
- Entry: fades in last, delay ~0.6s.
- **Shimmer/Reflection Effect (`ShimmerText.tsx`):** a diagonal light streak moves across the text from left to right, repeating every ~4 seconds. Implement with a CSS gradient mask or pseudo-element:
  - A narrow, angled (roughly 20deg) bright band (`rgba(255,255,255,0.3)`) translates across the text's width.
  - Use `background-clip: text` or a moving `mask-image` gradient over the text.
  - Duration: ~1.5s for the sweep, then pause ~4s before repeating.
  - Subtle — should feel like light glinting, not a spotlight.
- **Hover:** arrow `→` translates 4px right. Letter-spacing increases 0 → 0.5px. Underline grows left→right same style as center links. Brightness increases slightly.

**Mobile (< 768px):**
- Hamburger menu icon (animated: 3 lines → X on open).
- Opens full-screen overlay (`#000` background), links stacked vertically, centered, large text.
- Staggered fade-in of links when menu opens.

---

### 5.3 Hero Section (`Hero.tsx`)

Full viewport height (`100vh`). Content centered vertically and horizontally.

**`HeroTitle.tsx` — Main Text:**

```
Hey! I'm
Ayush Gandhi
```

- Two distinct lines. "Hey! I'm" on the first line, "Ayush Gandhi" on the second, larger.
- Appears ~1s after page load (after nav animations finish).
- **Animation:** each word fades in with slight upward motion (`y: 20px → 0`, `opacity 0→1`, stagger 0.08s per word, duration 0.8s, ease `power2.out`).
- **"Ayush Gandhi" treatment:**
  - Rendered in the **serif font** (`--font-serif`, Instrument Serif by default). The rest of the hero text uses the heading sans-serif.
  - After the word reveal completes: subtle letter-spacing expansion (`0 → 0.03em`) over 1.2s.
  - Optionally in italic (Instrument Serif's italic is beautiful) — enable by default.
  - Larger size than the greeting line — roughly `clamp(3rem, 8vw, 7rem)` vs `clamp(1.5rem, 3vw, 2.5rem)` for "Hey! I'm".

**Mouse Parallax:**
- On desktop only, the hero text block shifts subtly in response to mouse position.
- Maximum movement: ±10px on x-axis, ±6px on y-axis. This must be very subtle.
- Use Framer Motion's `useMotionValue` and `useTransform` to track mouse position and map it to translate values.
- Apply to the entire hero text container, not individual words.
- Disable on mobile and when `prefers-reduced-motion` is active.

**`TaglineLoop.tsx` — Rotating Taglines:**

Positioned below the hero title, center-aligned.

- **Typewriter / coding-style animation:**
  - Each tagline "types" in from left to right, character by character.
  - Font: `--font-mono` (JetBrains Mono), `#A0A0A0`, uppercase, letter-spacing 0.08em, small size (~0.875rem).
  - Typing speed: ~40ms per character.
  - After the tagline is fully typed, hold for ~2s, then fade it out (`opacity 1→0`, duration 0.4s).
  - Next tagline types in fresh.
  - Show a blinking cursor `|` at the typing position. Cursor blinks at ~530ms interval when idle. Cursor disappears during fade-out transition.
- Cycle through all taglines from config, then loop back to the first.

**`ScrollIndicator.tsx`:**

```
↓ Scroll to explore
```

- Bottom center of the hero, about 40px from bottom edge.
- Fades in last (~2.5s after page load).
- Floating motion: `y` oscillates ±5px, duration 2s, infinite, ease `sine.inOut`.
- Text: `#A0A0A0`, small, tracking-wider.
- Fades out when user begins scrolling (first 100px of scroll → `opacity 1→0`).

**Optional radial light:**
- Very subtle radial gradient behind/around the hero text, centered on the text.
- Something like `radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)`.
- Barely visible — more felt than seen. If it looks like a visible gradient, make it more subtle.

---

### 5.4 Hero → About Transition

- As user scrolls past the hero: hero content fades slightly (`opacity 1→0.3`) and moves up subtly (`y: 0 → -30px`).
- Use GSAP ScrollTrigger with `scrub: true` on the hero section.
- Section divider animates between them.

---

### 5.5 About Section (`About.tsx`)

**Layout:**

```
         [ About Me (centered heading) ]

         [ Paragraph 1                 ]
              ↓ scroll reveals ↓
         [ Paragraph 2                 ]
              ↓ scroll reveals ↓
         [ Paragraph 3                 ]
              ↓ scroll reveals ↓
         [ Paragraph 4                 ]

         [ Tech Stack Grid             ]
```

- Section background: `#0A0A0A`.
- Content centered, `max-width: ~760px`.

**`SectionHeading.tsx` (reusable):**
- Large, centered heading text. Font: heading sans-serif, `clamp(2.5rem, 7vw, 5rem)`, `#FFFFFF`, font-weight bold.
- Reveal animation: mask-reveal — wrap text in overflow-hidden container, text translates from `y: 100%` to `y: 0`, duration 0.9s, ease `power2.out`. Triggered when it enters the viewport.

**`AboutContent.tsx` — Progressive Paragraph Reveal:**
- Each paragraph from `siteConfig.about.paragraphs` is its own block.
- **Scroll-triggered reveal:** each paragraph enters independently as it comes into the viewport (`start: 'top 85%'`).
- Animation: `opacity 0→1`, `y: 40px → 0`, duration 0.9s, ease `power2.out`.
- Paragraphs are left-aligned within the centered column.
- Font: body sans-serif, `#A0A0A0`, `~1.0625rem`, `line-height: 1.7`.

**Keyword Highlighting:**
- Each paragraph's `keywords` array defines words that receive subtle emphasis.
- Implementation: find each keyword in the paragraph text and wrap it in a `<span>` with the class for highlighting.
- Highlight style: `color: #FFFFFF` (brighter than surrounding `#A0A0A0` text). That's all — no background, no underline, no glow. Just a brightness shift.
- These keywords are always styled, not animated on scroll — they're visible as soon as the paragraph appears.

**`TechStack.tsx` — Tech Icons Grid:**
- Grid layout of tech stack items, responsive: 6 columns on desktop, 4 on tablet, 3 on mobile.
- Each item: icon above, name below. Small size (~48px icon, ~0.75rem label).
- **Icons:** use SVG icons for each technology. You can use Simple Icons (https://simpleicons.org/) or inline SVGs. Color all icons `#A0A0A0` (monochrome, matching the theme — no brand colors).
- Staggered reveal: each item fades in with stagger 0.05s when the grid enters the viewport.
- **Hover:** icon and label brighten from `#A0A0A0` to `#FFFFFF`, duration 0.25s. Slight scale `1 → 1.08` on the icon.
- Arrange the grid to feel balanced, not cramped. Gap: ~32px horizontal, ~24px vertical.

---

### 5.6 About → Projects Transition

- About fades slightly as user scrolls past.
- Section divider animates.
- Projects heading enters the viewport.

---

### 5.7 Projects Section (`Projects.tsx`) — CORE SECTION

This is the most complex and important animation. Build it carefully and test it thoroughly.

**Layout:**

```
         [ Projects (centered heading) ]

[ ═══════════ Project Display Area (full width) ═══════════ ]
```

- Section background: `#000000`.
- The centered heading sits in normal scroll flow, uses `SectionHeading.tsx`.
- The project display area is **separate from the heading** and begins below it.

**Pinning Behavior (Desktop, ≥ 768px):**

- GSAP ScrollTrigger on the **project display area only** (not the heading), with `pin: true` and `scrub: true`.
- While pinned, vertical scroll input translates the project track horizontally.
- Pin starts when the display area's top edge reaches the top of the viewport.
- `end: '+=' + (projects.length * cardWidthIncludingGap)` — calculate based on actual card width so the scroll distance matches the content. Tune so it feels natural, not too fast or too slow.
- After all projects have cycled, unpin and resume vertical scrolling to Contact.

**Diagonal Scroll Effect:**

The signature visual effect. Projects move from **top-right to bottom-left** as the user scrolls.

Implementation:
- Primary movement: horizontal `translateX` (GSAP drives this based on scroll progress).
- Secondary movement: each card also has a slight `translateY` offset based on its horizontal position. Cards on the right sit higher; cards on the left sit lower.
- Formula: `yOffset = (cardIndex - scrollProgress * totalCards) * verticalStep` where `verticalStep` is ~30–40px.
- The overall visual impression should be a diagonal strip of cards floating from upper-right to lower-left.

**Circular Looping:**

- After the last project scrolls out to the left, the first project seamlessly re-enters from the top-right.
- **No gap, no empty space, continuous motion.**
- Implementation: clone the project array and append it to the track. When the scroll position passes the total width of the original set, seamlessly reset it — or simply render enough cloned cards that the user never sees an edge during the pinned scroll range.
- The loop is visual/aesthetic. It runs for one full cycle within the pinned scroll range, then the section unpins.

**`ProjectCard.tsx`:**

```
┌─────────────────────────────┐
│  Title                       │
│  Short description           │
│  Tech · Tech · Tech          │
│  View →                      │
└─────────────────────────────┘
```

- Card background: `#111111` with 1px border `rgba(229,229,229,0.1)`.
- Card size: `clamp(320px, 60vw, 700px)` width, auto height, padding ~40px.
- Border-radius: 12px.

**Focus/Active Effect:**
- The card nearest to the horizontal center of the viewport is the "active" card.
- Active card: `opacity: 1`, `scale: 1`, `filter: none`, border brightens to `rgba(229,229,229,0.3)`.
- Inactive cards: `opacity: 0.35`, `scale: 0.92`, `filter: blur(2px)`.
- Transition between active/inactive: duration 0.4s, ease `power2.out`.

**Internal Parallax Depth (within each card):**
- As the card moves horizontally across the viewport, elements inside it move at slightly different rates:
  - Card background/border: moves at the base scroll speed (1x).
  - Title and description text: moves at 1.05x speed (slightly faster, creates depth).
  - "View →" button: moves at 1.1x speed.
- This is a very subtle effect (~5–10px difference max). Implement by giving each element a small additional `translateX` tied to scroll progress.

**Hover (active card only):**
- Card: `scale 1 → 1.03`, duration 0.35s.
- "View →": underline grows left → right (same style as nav links).
- Cursor changes to pointer.

**Card Content Styling:**
- Title: heading font, `#FFFFFF`, ~1.5rem, font-weight 600.
- Description: body font, `#A0A0A0`, ~0.9375rem, line-height 1.6.
- Tech tags: `#A0A0A0`, ~0.75rem, separated by ` · `, tracking-wider.
- "View →": `#E5E5E5`, ~0.875rem, tracking-wide.

**Mobile/Tablet (< 768px):**
- Disable GSAP pinning entirely.
- Horizontal scroll with **native `overflow-x: auto`** + `scroll-snap-type: x mandatory`. Each card snaps: `scroll-snap-align: center`.
- Cards at ~85vw width on mobile.
- Preserve the slight vertical offset on cards (diagonal feel even in swipe mode).
- Disable internal parallax on mobile.
- The focus effect (active vs inactive opacity/scale) still applies based on which card is snapped to center. Detect the centered card with `IntersectionObserver` or a scroll position calculation.
- Swipe hint: on first visit, show a subtle "← swipe →" indicator that fades after the user first interacts.

---

### 5.8 Projects → Contact Transition

- Projects section unpins.
- Normal vertical scroll resumes.
- Section divider animates.
- Contact section fades in.

---

### 5.9 Contact Section (`Contact.tsx`)

**Layout:**

```
         [ Contact (centered heading) ]

         [ Social links grid          ]

         [ Closing line               ]
```

- Section background: `#0A0A0A`.
- Content centered, `max-width: ~600px`.
- Heading uses `SectionHeading.tsx`.

**`ContactList.tsx` — Social Links with Logos:**
- Each contact item is a clickable row/card.
- Layout per item: **logo icon on the left**, label and value on the right.
  - Icon: SVG, ~24px, `#A0A0A0`, monochrome. Use recognizable icons for each platform (GitHub's octocat, LinkedIn's "in", Instagram's camera, X's logo, envelope for email, phone for phone).
  - Label: small, `#A0A0A0`, uppercase, tracking-wider, ~0.75rem.
  - Value: `#FFFFFF`, heading font, ~1.125rem.
- Items stacked vertically with ~20px gap.
- **Staggered reveal:** each item fades in + slides up (`y: 20 → 0`, stagger 0.1s), triggered when the list enters viewport.
- **Hover effects:**
  - Icon brightens `#A0A0A0 → #FFFFFF`.
  - Value text shifts 4px right (`translateX`).
  - Underline grows left → right on the value text.
  - Duration 0.3s, ease `power2.out`.
- Each item wraps an `<a>` tag with `target="_blank"` (except email and phone which open natively).

**`ClosingLine.tsx`:**

```
Let's build something meaningful.
```

- Rendered in serif font (`--font-serif`), italic, large (~clamp(1.5rem, 4vw, 2.5rem)), `#FFFFFF`, center-aligned.
- Fades in with a longer delay (~0.5s after contact list finishes revealing).
- Generous top margin (~80px) to give it breathing room.

**Page End:**
- After the closing line: ~20vh of empty `#000000` space. No footer.
- The page simply ends. Clean fade to black.

---

### 5.10 Photography Page (`Photography.tsx`)

- Route: `/photography`.
- Full viewport, `#000000` background.
- Centered text: "Photography — Coming Soon" in serif font, `#FFFFFF`.
- Below it: "← Back to Portfolio" link, same style as nav links, navigates to `/`.
- This is a placeholder. The owner will build the full photography site later and plug it in here.

---

## 6. ANIMATION REFERENCE SHEET

Quick lookup for consistent motion across the site:

| Animation | Duration | Ease | Trigger |
|---|---|---|---|
| Page load fade | 0.8s | `power2.out` | Page load |
| Nav items stagger | 0.6s, stagger 0.08s | `power2.out` | Page load + 0.3s |
| Hero text reveal | 0.8s per word, stagger 0.08s | `power2.out` | Page load + 1s |
| Tagline typing | ~40ms/char | linear | After hero text |
| Section heading mask | 0.9s | `power2.out` | Scroll into view |
| Paragraph reveal | 0.9s | `power2.out` | Scroll into view |
| Section divider | 0.8s | `power2.out` | Scroll into view |
| Tech stack stagger | 0.5s, stagger 0.05s | `power2.out` | Scroll into view |
| Contact list stagger | 0.6s, stagger 0.1s | `power2.out` | Scroll into view |
| Hover underline | 0.35s | `power2.out` | Hover |
| Hover brightness | 0.25s | `ease` | Hover |
| Shimmer sweep | 1.5s, pause 4s | `linear` | Continuous |
| Scroll indicator float | 2s | `sine.inOut` | Infinite loop |

---

## 7. RESPONSIVENESS RULES

### Mobile (< 768px)
- Stack everything vertically.
- No GSAP pinning or scrub effects.
- Projects: horizontal swipe with snap.
- No mouse parallax.
- Reduce animation durations by ~30%.
- Hamburger nav instead of horizontal links.
- Tagline typewriter speed: slightly faster (~30ms/char) for smaller text.

### Tablet (768px – 1024px)
- Maintain general structure.
- Reduce spacing and typography sizes.
- Projects: can keep GSAP pinning but with reduced scroll distance.
- Parallax effects at half intensity.

### Desktop (> 1024px)
- Full experience: diagonal scroll, parallax, all hover effects, shimmer, grain.

---

## 8. PERFORMANCE REQUIREMENTS

- **60fps minimum** on all animations. If the diagonal scroll drops frames, reduce the blur on inactive cards or remove the internal parallax.
- Use `will-change: transform, opacity` only on elements actively animating. Remove after animation completes.
- Lazy-load the Photography route with `React.lazy` + `Suspense`.
- Memoize project cards and tech stack items with `React.memo`.
- SVG tech icons should be inline (not image files) for instant rendering.
- Call `ScrollTrigger.refresh()` after fonts load (`document.fonts.ready`).
- Test with Chrome DevTools Performance tab — no long frames during scroll.

---

## 9. DELIVERABLES

1. Complete project matching the structure in Section 2, every file implemented.
2. `npm install` and `npm run dev` must work immediately with zero errors.
3. All four config files populated with the defaults shown above.
4. A `README.md` explaining:
   - How to edit text content (edit `site.config.ts`).
   - How to add/remove/edit projects (edit `projects.config.ts`).
   - How to change colors (edit `theme.config.ts` and the corresponding `@theme` block in `globals.css`).
   - How to swap fonts (change `activeFontPairing` in `fonts.config.ts`).
   - Where to place the DP image and resume PDF (in `/public`).
5. No `// TODO` comments. No `console.log` statements. No commented-out code.
6. Every animation described in this document must be implemented — do not silently skip any.

---

## 10. FINAL VERIFICATION CHECKLIST

Before considering this done, verify every item:

- [ ] Pure black `#000000` background everywhere — no accidental Tailwind grays or off-blacks.
- [ ] Fonts load without visible flash (FOUT). Use `@fontsource` + `font-display: swap`.
- [ ] Grain overlay is subtle (3–5% opacity max), visible but not distracting.
- [ ] Nav links scroll smoothly to sections via Lenis (not native scroll behavior).
- [ ] Nav gets backdrop blur after ~80px scroll.
- [ ] Photography link has the shimmer/reflection sweep effect.
- [ ] Hero text reveals **after** nav finishes (not simultaneously).
- [ ] "Ayush Gandhi" is in serif italic, visually distinct from the greeting.
- [ ] Mouse parallax on hero text is subtle (~10px max) and disabled on mobile.
- [ ] Tagline types in character by character with a blinking cursor, monospace font.
- [ ] Tagline loops infinitely without glitches.
- [ ] Scroll indicator floats gently and fades out on first scroll.
- [ ] Section dividers expand from center on scroll.
- [ ] About paragraphs reveal progressively as user scrolls (not all at once).
- [ ] Keywords in About text are `#FFFFFF` against `#A0A0A0` body text.
- [ ] Tech stack shows monochrome SVG icons + names in a responsive grid.
- [ ] Projects section heading scrolls normally, then display area pins.
- [ ] Diagonal scroll works: cards move top-right → bottom-left.
- [ ] Project cards loop continuously with no gaps or empty space.
- [ ] Active project card is full opacity + scale; inactive cards are dimmed + blurred.
- [ ] Internal parallax on project cards is subtle and doesn't cause jank.
- [ ] On mobile, projects are swipeable with snap behavior.
- [ ] Contact items show platform logos (monochrome SVGs).
- [ ] Contact hover: icon brightens, text shifts right, underline grows.
- [ ] Closing line is serif italic, fades in last.
- [ ] Page ends with empty black space, no footer.
- [ ] `prefers-reduced-motion` disables all heavy animations gracefully.
- [ ] Lenis smooth scroll works and is integrated with GSAP ScrollTrigger.
- [ ] No console errors, no TypeScript errors, no layout shifts.
- [ ] All text, colors, fonts, and projects are driven by config files — zero hardcoded strings in components.
- [ ] Mobile hamburger menu works with animated open/close.
- [ ] Performance: smooth 60fps during all scroll animations on a modern laptop.

---

Build it. Every detail matters.
