import { ArrowDownRight, ArrowUpRight, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { clinic } from "@/config/clinic";
import { Container } from "./primitives";

export function Hero() {
  return (
    <section id="inicio" className="hero-scene relative isolate flex min-h-[700px] flex-col justify-end overflow-hidden bg-deep text-deep-foreground sm:min-h-[760px] lg:min-h-[min(850px,88svh)]">
      <img
        src={clinic.hero.image}
        alt={clinic.hero.imageAlt}
        loading="eager"
        fetchPriority="high"
        className="hero-photo absolute inset-0 -z-20 size-full object-cover object-[62%_center] sm:object-[center_40%]"
      />
      <div className="hero-shade absolute inset-0 -z-10" aria-hidden />

      <Container className="relative z-10 pt-44 pb-12 sm:pt-48 sm:pb-16 lg:pb-20">
        <div className="max-w-[750px]">
          <p className="hero-enter flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            <span className="h-px w-8 bg-gold" aria-hidden />
            Clínica Veterinária Dr. Kleber 24h
          </p>
          <h1 className="hero-enter hero-enter-delayed mt-6 max-w-[720px] text-[clamp(2.8rem,5.5vw,5.6rem)] leading-[1.08] font-semibold text-deep-foreground">
            Cuidado, carinho e dedicação em <span className="text-sage">todos os momentos.</span>
          </h1>
          <p className="hero-enter hero-enter-later mt-7 max-w-[540px] text-base leading-relaxed text-deep-foreground/90 sm:text-lg">
            {clinic.hero.subtitle}
          </p>
          <div className="hero-enter hero-enter-later mt-9 flex flex-wrap gap-3">
            <a href={clinic.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-gold px-6 py-3.5 text-sm font-bold text-gold-foreground shadow-lift transition-all duration-300 hover:-translate-y-1 hover:bg-cream">
              <MessageCircle className="size-4" aria-hidden /> Falar com a clínica
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
            <a href="#servicos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-deep-foreground/50 bg-deep/25 px-6 py-3.5 text-sm font-semibold text-deep-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-deep/55">
              Conhecer os serviços <ArrowDownRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
        <div className="mt-14 grid gap-5 border-t border-deep-foreground/30 pt-6 text-sm sm:grid-cols-[1fr_1.7fr_1fr] sm:items-center lg:mt-20">
          <a href={clinic.contact.phoneHref} className="group flex items-center gap-3 transition-colors hover:text-gold">
            <Phone className="size-5 shrink-0 text-gold" aria-hidden />
            <span><span className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-sage">Plantão 24 horas</span><strong className="font-semibold">{clinic.contact.phoneLabel}</strong></span>
          </a>
          <a href={clinic.address.mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold">
            <MapPin className="size-5 shrink-0 text-gold" aria-hidden />
            <span><span className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-sage">Em Boa Vista — RR</span>{clinic.address.street}, {clinic.address.district}</span>
          </a>
          <a href={clinic.reviews.profileLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-gold">
            <Star className="size-5 shrink-0 fill-gold text-gold" aria-hidden />
            <span><span className="block text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-sage">Avaliações no Google</span><strong className="font-semibold">{clinic.reviews.rating}</strong> · {clinic.reviews.count} avaliações</span>
          </a>
        </div>
      </Container>
    </section>
  );
}