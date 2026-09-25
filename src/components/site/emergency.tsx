import { MapPin, MessageCircle, Phone, CreditCard, Clock } from "lucide-react";
import { clinic } from "@/config/clinic";
import { Container, Reveal, SectionHeading } from "./primitives";

export function Emergency() {
  return (
    <section id="emergencia" className="relative overflow-hidden bg-deep py-20 lg:py-28">
      <Container className="relative">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Atendimento imediato"
            title="Emergência veterinária? Estamos aqui para ajudar, 24 horas."
            description="A clínica funciona 24 horas para acolher seu pet em momentos de urgência, com estrutura, atenção e cuidado profissional."
          />
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <a
            href={clinic.contact.phoneHref}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-sm font-bold text-gold-foreground shadow-lift transition-transform hover:-translate-y-0.5"
          >
            <Phone className="size-4" aria-hidden />
            Ligar agora
          </a>
          <a
            href={clinic.contact.whatsappEmergency}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 text-sm font-bold text-whatsapp-foreground shadow-lift transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="size-4" aria-hidden />
            Conversar pelo WhatsApp
          </a>
          <a
            href={clinic.address.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-deep-foreground/25 px-6 py-4 text-sm font-semibold text-deep-foreground transition-colors hover:bg-deep-foreground/10"
          >
            <MapPin className="size-4" aria-hidden />
            Ver no mapa
          </a>
        </Reveal>

        <div className="mt-14 grid gap-0 border-y border-deep-foreground/20 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, label: "Endereço", value: clinic.address.full },
            { icon: Phone, label: "Telefone", value: clinic.contact.phoneLabel },
            { icon: Clock, label: "Horário", value: clinic.hours },
            { icon: CreditCard, label: "Pagamento", value: clinic.payments },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 80}>
              <div className="h-full border-b border-deep-foreground/15 p-5 sm:border-r lg:border-b-0">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <item.icon className="size-4" aria-hidden />
                </span>
                <p className="mt-4 text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-deep-foreground/85">
                  {item.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
