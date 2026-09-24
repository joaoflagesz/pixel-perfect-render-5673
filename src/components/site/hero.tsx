import { ArrowRight, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { clinic } from "@/config/clinic";
import { Container, Reveal } from "./primitives";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-24 size-[34rem] rounded-full bg-secondary/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 size-[26rem] rounded-full bg-cream blur-3xl"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-xs font-semibold tracking-wide text-primary shadow-soft">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-whatsapp/70" />
              <span className="relative inline-flex size-2 rounded-full bg-whatsapp" />
            </span>
            Aberto agora • 24 horas, todos os dias
          </span>

          <h1 className="mt-6 text-4xl leading-[1.06] font-semibold sm:text-5xl lg:text-[3.6rem]">
            Cuidado, carinho e dedicação em{" "}
            <span className="text-primary">todos os momentos.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {clinic.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={clinic.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5"
            >
              Falar com a clínica
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 bg-card px-7 py-4 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
            >
              Conhecer nossos serviços
            </a>
          </div>

          <div className="mt-9 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-6">
            <a
              href={clinic.contact.phoneHref}
              className="inline-flex items-center gap-2 font-semibold text-foreground transition-colors hover:text-primary"
            >
              <Phone className="size-4 text-primary" aria-hidden />
              {clinic.contact.phoneLabel}
            </a>
            <a
              href={clinic.address.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <MapPin className="size-4 text-primary" aria-hidden />
              {clinic.address.street} — {clinic.address.district},{" "}
              {clinic.address.city} - {clinic.address.state}
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div className="relative overflow-hidden rounded-[2rem] shadow-deep">
            <img
              src={clinic.hero.image}
              alt={clinic.hero.imageAlt}
              className="aspect-4/5 w-full object-cover sm:aspect-3/4"
              loading="eager"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep/70 to-transparent"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-card/95 p-4 shadow-lift backdrop-blur">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <ShieldCheck className="size-5" aria-hidden />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold">Emergência agora?</p>
                <p className="text-xs text-muted-foreground">
                  A equipe responde pelo WhatsApp a qualquer hora.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="surface-card px-4 py-4 text-center">
              <p className="font-display text-xl font-semibold text-primary">
                24h
              </p>
              <p className="mt-1 text-[0.7rem] text-muted-foreground">
                todos os dias
              </p>
            </div>
            <div className="surface-card px-4 py-4 text-center">
              <p className="flex items-center justify-center gap-1 font-display text-xl font-semibold text-primary">
                {clinic.reviews.rating}
                <Star className="size-4 fill-gold text-gold" aria-hidden />
              </p>
              <p className="mt-1 text-[0.7rem] text-muted-foreground">
                no Google
              </p>
            </div>
            <div className="surface-card px-4 py-4 text-center">
              <p className="font-display text-xl font-semibold text-primary">
                {clinic.reviews.count}
              </p>
              <p className="mt-1 text-[0.7rem] text-muted-foreground">
                avaliações
              </p>
            </div>
          </div>
        </Reveal>
      </Container>

      <div aria-hidden className="mt-16 h-px w-full hairline-gold lg:mt-24" />
    </section>
  );
}
