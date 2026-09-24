import { useState } from "react";
import { MessageCircle, Play } from "lucide-react";
import { clinic } from "@/config/clinic";
import { Container, Reveal, SectionHeading } from "./primitives";

export function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-cream py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Vídeo institucional"
            title={clinic.video.title}
            description={clinic.video.description}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-deep shadow-deep">
              {playing ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster={clinic.video.poster}
                  className="h-auto max-h-[70vh] w-full bg-deep object-contain"
                >
                  <source src={clinic.video.src} type="video/mp4" />
                  Seu navegador não suporta a reprodução de vídeo.
                </video>
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group relative block w-full"
                  aria-label="Reproduzir vídeo institucional da clínica"
                >
                  <img
                    src={clinic.video.poster}
                    alt="Capa do vídeo institucional da Clínica Veterinária Dr. Kleber 24h"
                    loading="lazy"
                    className="aspect-16/10 w-full object-cover sm:aspect-16/9"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-deep/30 transition-colors group-hover:bg-deep/40"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex size-16 items-center justify-center rounded-full bg-card/95 text-primary shadow-lift transition-transform group-hover:scale-105 sm:size-20">
                      <Play className="size-7 fill-primary sm:size-8" aria-hidden />
                    </span>
                  </span>
                </button>
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <aside className="surface-card overflow-hidden">
              <img
                src={clinic.video.doctor.photo}
                alt={`${clinic.video.doctor.name}, médico veterinário`}
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
              <div className="p-6">
                <span className="eyebrow">{clinic.video.doctor.role}</span>
                <h3 className="mt-2 text-xl font-semibold">
                  {clinic.video.doctor.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {clinic.video.doctor.text}
                </p>
                <a
                  href={clinic.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-whatsapp-foreground transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  Chamar no WhatsApp
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
