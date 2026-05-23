import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillMatrix from "@/components/SkillMatrix";
import TheLab from "@/components/TheLab";
import Ecosystem from "@/components/Ecosystem";
import Contact from "@/components/Contact";
import SystemBanner from "@/components/SystemBanner";
/* ═══════════════════════════════════════════════════════════
   Home Page — Faiz.AI Portfolio
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <SystemBanner type="marquee" />
      <SkillMatrix />
      <TheLab />
      <SystemBanner type="mission" />
      <Ecosystem />
      <Contact />
    </main>
  );
}
