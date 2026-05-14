import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { HeroSection } from "@/components/site/sections/hero"
import { WhatWeDoSection } from "@/components/site/sections/what-we-do"
import { ExportProblemsSection } from "@/components/site/sections/export-problems"
import { OurProcessSection } from "@/components/site/sections/our-process"
import { ServicesGridSection } from "@/components/site/sections/services-grid"
import { WhyChooseUsSection } from "@/components/site/sections/why-choose-us"
import { InternationalVisionSection } from "@/components/site/sections/international-vision"
import { FinalCtaSection } from "@/components/site/sections/final-cta"

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ekvator360",
  url: "https://ekvator360.com",
  logo: "https://ekvator360.com/favicon.ico",
  description:
    "Ekvator360 is a premium international sales and export management firm. We act as the outsourced export department for manufacturers, building overseas channels, finding foreign buyers and operating export functions end to end.",
  sameAs: [],
}

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ekvator360, Export Management & International Sales",
  serviceType: [
    "Export Management",
    "International Sales Development",
    "Market Research",
    "Overseas Customer Acquisition",
    "Process Management",
  ],
  areaServed: "Worldwide",
  description:
    "Outsourced international sales department for manufacturers, strategy, buyer access, sales operations and ongoing market management.",
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([orgJsonLd, serviceJsonLd]),
        }}
      />
      <SiteHeader />
      <main>
        <HeroSection />
        <WhatWeDoSection />
        <ExportProblemsSection />
        <OurProcessSection />
        <ServicesGridSection />
        <WhyChooseUsSection />
        <InternationalVisionSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
