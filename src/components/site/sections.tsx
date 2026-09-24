import { useState } from "react";
import {
  Check,
  Siren,
  Stethoscope,
  Syringe,
  Microscope,
  HeartPulse,
  Scan,
  Hospital,
  Scissors,
  Pill,
  Star,
  ExternalLink,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { clinic } from "@/config/clinic";
import { Container, Reveal, SectionHeading } from "./primitives";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  siren: Siren,
  stethoscope: Stethoscope,
  syringe: Syringe,
  microscope: Microscope,
  "heart-pulse": HeartPulse,
  scan: Scan,
  hospital: Hospital,
  scissors: Scissors,
  pill: Pill,
};

export function About() {
  return (
    <section id="a-clinica" className="py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="A clínica"
            title={clinic.about.title}
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            {clinic.about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {clinic.about.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm font-medium">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <Check className="size-3" aria-hidden />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="grid grid-cols-2 gap-4">
          <img
            src={clinic.about.images[0].src}
            alt={clinic.about.images[0].alt}
            loading="lazy"
            className="mt-8 aspect-3/4 w-full rounded-[1.5rem] object-cover shadow-soft"
          />
          <img
            src={clinic.about.images[1].src}
            alt={clinic.about.images[1].alt}
            loading="lazy"
            className="aspect-3/4 w-full rounded-[1.5rem] object-cover shadow-lift"
          />
        </Reveal>
      </Container>
    </section>
  );
}

export function Services() {
  return (
    <section id="servicos" className="bg-secondary/40 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Serviços"
            title="Cuidado completo em um só lugar."
            description="Serviços focados em saúde, diagnóstico, tratamento e acompanhamento veterinário para cães e gatos."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clinic.services.map((service, i) => {
            const Icon = icons[service.icon] ?? Stethoscope;
            return (
              <Reveal key={service.title} delay={(i % 3) * 90}>
                <article className="group surface-card flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.text}
                  </p>
                  <a
                    href={clinic.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Falar sobre este serviço
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function Exams() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Diagnóstico"
            title={clinic.exams.title}
            description={clinic.exams.description}
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {clinic.exams.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <article
                className={cn(
                  "surface-card group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
                  "featured" in card && card.featured && "ring-1 ring-gold/40",
                )}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="aspect-16/11 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="mt-8 flex flex-wrap justify-center gap-2.5">
          {clinic.exams.list.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

export function Surgery() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <img
            src={clinic.surgery.mainImage}
            alt="Centro cirúrgico veterinário da clínica"
            loading="lazy"
            className="aspect-4/3 w-full rounded-[1.75rem] object-cover shadow-lift"
          />
          <div className="mt-4 grid grid-cols-2 gap-4">
            {clinic.surgery.gallery.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-square w-full rounded-2xl object-cover shadow-soft"
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Centro cirúrgico"
            title={clinic.surgery.title}
            description={clinic.surgery.text}
          />
          <ul className="mt-8 space-y-3">
            {clinic.surgery.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm font-medium">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <Check className="size-3" aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <a
            href={clinic.contact.whatsappSchedule}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Tirar dúvidas sobre cirurgias
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

export function Team() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Nossa equipe"
            title={clinic.team.title}
            description={clinic.team.description}
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {clinic.team.photos.map((photo, i) => (
            <Reveal key={photo.src} delay={(i % 6) * 70}>
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="aspect-3/4 w-full rounded-2xl object-cover shadow-soft transition-transform duration-500 hover:-translate-y-1"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Gallery() {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="estrutura" className="bg-secondary/40 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Estrutura"
            title="Estrutura, ambiente e momentos reais de cuidado."
            description="Fotos organizadas por área para apresentar a clínica, a equipe e os atendimentos."
          />
        </Reveal>

        <div className="mt-14 space-y-14">
          {clinic.gallery.map((group) => (
            <Reveal key={group.label}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="eyebrow">{group.label}</span>
                  <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                    {group.title}
                  </h3>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {group.photos.map((photo) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setActive(photo)}
                    className="group relative overflow-hidden rounded-2xl shadow-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    aria-label={`Ampliar imagem: ${photo.alt}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-deep/0 transition-colors duration-300 group-hover:bg-deep/15"
                    />
                  </button>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-4xl overflow-hidden border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{active?.alt ?? "Imagem"}</DialogTitle>
          {active ? (
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[85vh] w-full rounded-2xl object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Confiança de tutores"
            title={`${clinic.reviews.rating} estrelas no Google com ${clinic.reviews.count} avaliações.`}
            description="Avaliações publicadas por tutores no perfil da clínica no Google."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {clinic.reviews.items.map((review, i) => (
            <Reveal key={review.author} delay={i * 90}>
              <figure className="surface-card flex h-full flex-col p-7">
                <div className="flex gap-1 text-gold" aria-hidden>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="size-4 fill-gold" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 font-display text-base leading-relaxed">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-primary">
                  {review.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="mt-9 text-center">
          <a
            href={clinic.reviews.profileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
          >
            Ver avaliações no Google
            <ExternalLink className="size-4" aria-hidden />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
