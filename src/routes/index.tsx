import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Emergency } from "@/components/site/emergency";
import {
  About,
  Services,
  Exams,
  Surgery,
  Team,
  Gallery,
  Reviews,
} from "@/components/site/sections";
import { VideoSection } from "@/components/site/video";
import { Contact } from "@/components/site/contact";
import { Footer, MobileActionBar } from "@/components/site/footer";
import { clinic } from "@/config/clinic";

const title = "Clínica Veterinária Dr. Kleber 24h | Boa Vista - RR";
const description =
  "Atendimento veterinário 24 horas em Boa Vista - RR: emergência, consultas, vacinas, cirurgias, internação, exames laboratoriais, ultrassom e eletrocardiograma para cães e gatos.";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: clinic.name,
  telephone: "+5595981195702",
  url: "/",
  image: clinic.hero.secondaryImage,
  openingHours: "Mo-Su 00:00-23:59",
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address.street,
    addressLocality: clinic.address.city,
    addressRegion: clinic.address.state,
    postalCode: clinic.address.zip,
    addressCountry: "BR",
  },
  sameAs: [clinic.contact.instagram, clinic.contact.facebook],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "233",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusiness),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Emergency />
        <About />
        <Services />
        <Exams />
        <Surgery />
        <Team />
        <Gallery />
        <VideoSection />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
