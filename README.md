Markdown
#  Soliya Sanctuary | Siargao Island Resort

A premium, high-performance web experience for **Soliya Sanctuary**, a luxury boutique resort nestled in Siargao Island, Philippines. Built with modern web architecture to provide a seamless, content-rich interactive preview of the resort experience, accommodations, wellness activities, and local island adventures.

 **Live Production Deployment:** [soliya-resort.vercel.app](https://soliya-resort.vercel.app)

---

##  Features

* **Responsive Hybrid Design:** Pixel-perfect layouts optimized seamlessly for mobile, standard tablets (iPads), large tablets, and high-resolution desktop viewports.
* **Sticky Dynamic Booking Bar:** A smooth client-side interaction system to facilitate real-time engagement and reservations.
* **Bespoke Typography & Aesthetics:** Immersive combination of editorial serif headers and clean, scannable modern sans-serif typography mirroring the sanctuary's physical atmosphere.
* **Performance First:** Built using Next.js App Router for optimal Server-Side Rendering (SSR) metrics, instant asset delivery, and layout stability.

---

##  Tech Stack

* **Framework:** [Next.js 15+](https://nextjs.org/) (App Router Architecture)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first framework with customized responsive breakpoints)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict static typing for robust state and prop management)
* **Deployment & Hosting:** [Vercel](https://vercel.com/) (Edge networks, optimized caching headers, and automatic CI/CD)

---

##  Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.0 or higher) installed on your local environment.

### 1. Clone the Repository

```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME
2. Install Dependencies
Using your preferred package manager:

Bash
npm install
# or
yarn install
# or
pnpm install
3. Spin Up Local Development Server
Bash
npm run dev
# or
yarn dev
# or
pnpm dev
Open http://localhost:3000 with your browser to explore the local instance. Core layout logic can be modified primarily via app/page.tsx and custom global layouts within app/layout.tsx.
```
Core Component Blueprint
components/Logo.tsx — Handles multi-variant responsive light/dark rendering configurations.

components/HomepageLayout.tsx — Master layout shell containing the custom fixed top navigation bar, micro-iframe dynamic map controls, and structural core context views.

 Deployment
This project uses Vercel Git Integration to automatically track the production branch. Every push to main instantly triggers a fresh build production lifecycle pipeline.

##  Live Preview

You can explore the live, fully deployed instance of the resort platform here:  
 **[soliya-resort.vercel.app](https://soliya-resort.vercel.app)**
