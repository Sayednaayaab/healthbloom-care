import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { DoctorsSection } from "@/components/sections/DoctorsSection";
import { SymptomCheckerSection } from "@/components/sections/SymptomCheckerSection";
import { WellnessSection } from "@/components/sections/WellnessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Footer } from "@/components/sections/Footer";
import { BloomBot } from "@/components/BloomBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <DoctorsSection />
        <SymptomCheckerSection />
        <WellnessSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <BloomBot />
    </div>
  );
};

export default Index;
