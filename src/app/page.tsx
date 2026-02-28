import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LogoStrip from "@/components/landing/LogoStrip";
import DashboardPreview from "@/components/landing/DashboardPreview";
import BentoFeatures from "@/components/landing/BentoFeatures";
import ImpactNumbers from "@/components/landing/ImpactNumbers";
import Process from "@/components/landing/Process";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-void">
      <Navbar />
      <Hero />
      <LogoStrip />
      <DashboardPreview />
      <BentoFeatures />
      <ImpactNumbers />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
