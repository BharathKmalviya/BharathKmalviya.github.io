import {AboutSection} from '@/components/sections/about-section';
import {ContactSection} from '@/components/sections/contact-section';
import {ExperienceSection} from '@/components/sections/experience-section';
import {FeaturedWorkSection} from '@/components/sections/featured-work-section';
import {HeroSection} from '@/components/sections/hero-section';
import {TechStackSection} from '@/components/sections/tech-stack-section';
import {SiteFooter} from '@/components/ui/site-footer';
import {SiteNav} from '@/components/ui/site-nav';

export function PortfolioPage() {
  return (
    <div className="page-shell text-[var(--text)]">
      <SiteNav />
      <main>
        <HeroSection />
        <FeaturedWorkSection />
        <ExperienceSection />
        <AboutSection />
        <TechStackSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
