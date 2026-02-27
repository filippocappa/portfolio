# Filippo Cappa — Portfolio

A high-performance, typography-centric personal portfolio and case study platform. This project showcases the intersection of economics, quantitative modelling, and community building through a minimalist, motion-driven user experience.

## 1. Project Overview
This application serves as a digital manifesto and portfolio for Filippo Cappa. It features a sophisticated "snap-scroll" layout, custom motion sequences, and detailed case studies. The design prioritizes clarity and high-signal information, utilizing a disciplined aesthetic inspired by financial terminals and editorial design.

**Key Features:**
- **MDX-Powered Case Studies:** Content-rich project deep-dives using Markdown for flexibility and rich component embedding.
- **Magnetic Interaction Model:** Bespoke cursor that "snaps" to interactive elements with a high-contrast accessibility mode for orange buttons.
- **Financial Aesthetics:** Integrated real-time market data visualizer (Stock Ticker) and interactive volatility charts.
- **Immersive Motion:** Precision snap-scrolling on the homepage and smooth scrolling (Lenis) on sub-pages, with seamless Framer Motion page transitions.
- **Data Export Simulation:** Custom UI patterns for resume downloads styled as terminal data exports.

## 2. Architecture Breakdown
The project is built using the **Next.js App Router**, leveraging modern React patterns for performance and SEO.

- **Routing:** Uses the `/app` directory for file-system based routing, including dynamic segments for project case studies (`/work/[slug]`).
- **Data Fetching Strategy:** 
  - **MDX Integration:** Project content is managed via `.mdx` files in `/content/projects`, parsed with `gray-matter` and rendered using `next-mdx-remote/rsc`.
  - **Server Components:** Most pages are rendered as Server Components for optimal performance and SEO.
  - **Client-Side Interactivity:** Selective use of `'use client'` for motion-heavy components (Lenis, Page Transitions, Interactive Charts, and the Magnetic Cursor).

## 3. Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Content:** [MDX](https://mdxjs.com/) with `next-mdx-remote`
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/) & [Lenis](https://github.com/studio-freight/react-lenis) (Smooth Scroll)
- **Typography:** Geist Mono, Inter Tight, and Inter
- **Linting:** ESLint

## 4. Project Structure
```text
/app
├── layout.tsx         # Root layout (Cursor, StockTicker, SmoothScroll)
├── page.tsx           # Home page with mandatory snap-scroll
└── work
    └── [slug]         # Dynamic MDX Case Study engine
        └── page.tsx   # Project detail template (Server Component)

/components
├── Cursor.tsx         # Magnetic interactive cursor with contrast mode
├── PageTransition.tsx # Framer Motion route transition wrapper
├── SmoothScroll.tsx   # Conditional Lenis initialization
├── VolatilityChart.tsx# Client-side interactive SVG data visualization
└── StockTicker.tsx    # Marquee-style market data bar

/content
└── projects           # .mdx project files with YAML frontmatter

/lib
├── mdx.ts             # MDX parsing and content fetching logic
└── market.json        # Mock market data for the ticker
```

## 5. Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Local Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/filippocappa/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the result.

---
Built with discipline by Filippo Cappa.
