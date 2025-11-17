import { Navigation } from './src/components/layout/Navigation';
import { Footer } from './src/components/layout/Footer';
import { HeroSection } from './src/components/sections/HeroSection';
import { WorkSection } from './src/components/sections/WorkSection';
import { SystemsSection } from './src/components/sections/SystemsSection';
import { EssaysSection } from './src/components/sections/EssaysSection';
import { AboutSection } from './src/components/sections/AboutSection';
import { ResumeSection } from './src/components/sections/ResumeSection';
import { ContactSection } from './src/components/sections/ContactSection';
import { Toaster } from './src/components/ui/sonner';

export default function App() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen text-foreground" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(20, 184, 166, 0.015) 50%, #FFFFFF 100%)' }}>
        <HeroSection />
        <div style={{ backgroundColor: 'rgba(20, 184, 166, 0.02)' }}>
          <WorkSection />
        </div>
        <SystemsSection />
        <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.018)' }}>
          <EssaysSection />
        </div>
        <AboutSection />
        <div style={{ backgroundColor: 'rgba(99, 102, 241, 0.02)' }}>
          <ResumeSection />
        </div>
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}