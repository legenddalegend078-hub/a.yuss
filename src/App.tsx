/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { SplineSceneBasic } from "@/components/ui/demo";
import { Navbar } from "@/components/ui/navbar";
import DemoOne from "@/components/ui/feature-demo";
import { OutfitSection } from "@/components/ui/outfit";
import { ProjectsSection } from "@/components/ui/projects-section";
import { ContactSection } from "@/components/ui/contact";
import { Footer } from "@/components/ui/footer-section";
import { TubesBackground } from "@/components/ui/tubes-background";

// Navbar height is ~80px on desktop, ~72px on mobile.
// We use pt-20 (80px) as the universal safe offset for all sections.
// scroll-mt-20 ensures that when nav links jump to a section, the title
// isn't hidden behind the fixed navbar.

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white selection:bg-white/20 selection:text-white relative overflow-x-hidden font-sans">

      {/* ── Background FX — fixed layer, z-0, pointer-events-none ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <TubesBackground />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
      </div>

      {/* ── Navbar — fixed, z-50, glassmorphism ── */}
      <Navbar />

      {/* ── Main — natural scroll, no snap ── */}
      <main className="relative z-10 w-full flex flex-col">

        {/* HOME
            pt-24 on mobile → pt-32 on md pushes hero fully below navbar.
            min-h-screen keeps it full-viewport even on tall desktops.
            scroll-mt-20 corrects anchor-link offset. */}
        <section
          id="home"
          className="scroll-mt-20 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16"
        >
          <div className="w-full max-w-7xl mx-auto">
            <SplineSceneBasic />
          </div>
        </section>

        {/* FEATURES */}
        <section
          id="features"
          className="scroll-mt-20 w-full bg-[#050505] px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="w-full max-w-7xl mx-auto">
            <DemoOne />
          </div>
        </section>

        {/* STYLE / OUTFIT — personal photo gallery with real images */}
        <section
          id="style"
          className="scroll-mt-20 w-full bg-[#0a0a0a]"
        >
          <OutfitSection />
        </section>

        {/* PROJECTS — code projects with circular gallery */}
        <section
          id="projects"
          className="scroll-mt-20 w-full bg-[#080808]"
        >
          <ProjectsSection />
        </section>

        {/* SKILLS / CONTACT */}
        <section
          id="skills"
          className="scroll-mt-20 w-full bg-[#0C0C0C]"
        >
          <ContactSection />
        </section>

      </main>

      {/* FOOTER */}
      <div className="relative z-10 border-t border-white/10 bg-[#0c0c0c]">
        <Footer />
      </div>

    </div>
  );
}
