import { Navigation } from './src/components/layout/Navigation';
import { Footer } from './src/components/layout/Footer';
import { HeroSection } from './src/components/sections/HeroSection';
import { WorkSection } from './src/components/sections/WorkSection';
import { SystemsSection } from './src/components/sections/SystemsSection';
import { EssaysSection } from './src/components/sections/EssaysSection';
import { AboutSection } from './src/components/sections/AboutSection';
import { ContactSection } from './src/components/sections/ContactSection';
import { Toaster } from './src/components/ui/sonner';

export default function App() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground">
        <HeroSection />
        <WorkSection />
        <SystemsSection />
        <EssaysSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}