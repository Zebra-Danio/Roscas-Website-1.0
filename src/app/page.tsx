import ContentSection from "@/components/content-4";
import ContentSection2 from "@/components/content-7";
import FAQsThree from "@/components/faqs-3";
import Features from "@/components/features-4";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";


export default function Home() {
  return (
      <div>
      <HeroSection />
      <Features />
      <ContentSection />  
      <ContentSection2 />
      <FAQsThree />
      <FooterSection />
      </div>
  );
}
