import { useState } from "react";
import {
  Clock,
  CreditCard,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { clinic } from "@/config/clinic";
import { Container, Reveal, SectionHeading } from "./primitives";

export function Contact() {
  const [form, setForm] = useState({ name: "", pet: "", message: "" });

  const waLink = () => {
    const text = [
      `Olá, me chamo ${form.name || "(nome)"}.`,
      form.pet ? `Meu pet é o ${form.pet}.` : "",
      form.message || "Gostaria de falar com a clínica.",
    ]
      .filter(Boolean)
      .join(" ");
    return `https://wa.me/5595981195702?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contato" className="py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Contato e localização"
            title="Estamos no Centro de Boa Vista - RR, prontos para atender."
            description={clinic.address.full}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="surface-card flex h-full flex-col p-7">
              <ul className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    label: "Endereço",
                    value: clinic.address.full,
                  },
                  {
                    icon: Phone,
                    label: "Telefone e WhatsApp",
                    value: clinic.contact.phoneLabel,
                  },
                  { icon: Clock, label: "Horário", value: clinic.hours },
                  {
                    icon: CreditCard,
                    label: "Formas de pagamento",
                    value: clinic.payments,
                  },
                ].map((item) => (
                  <li key={item.label} className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                      <item.icon className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a
                  href={clinic.contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/25 px-5 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
                >
                  <Phone className="size-4" aria-hidden />
                  Ligar
                </a>
                <a
                  href={clinic.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-sm font-semibold text-whatsapp-foreground transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  WhatsApp
                </a>
                <a
                  href={clinic.address.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary sm:col-span-1"
                >
                  <MapPin className="size-4 text-primary" aria-hidden />
                  Google Maps
                </a>
                <a
                  href={clinic.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  <Instagram className="size-4 text-primary" aria-hidden />
                  Instagram
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="surface-card h-full overflow-hidden">
              <iframe
                title={`Mapa — ${clinic.name}`}
                src={clinic.address.mapsEmbed}
                loading="lazy"
                className="h-64 w-full border-0 lg:h-80"
              />
              <form
                className="p-7"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.open(waLink(), "_blank", "noopener,noreferrer");
                }}
              >
                <h3 className="text-lg font-semibold">Envie sua mensagem</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Ao enviar, sua mensagem é aberta no WhatsApp da clínica para
                  atendimento imediato.
                </p>
                <div className="mt-5 space-y-3">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Seu nome"
                    aria-label="Seu nome"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <input
                    value={form.pet}
                    onChange={(e) => setForm({ ...form, pet: e.target.value })}
                    placeholder="Nome do pet (opcional)"
                    aria-label="Nome do pet"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <textarea
                    required
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Como podemos ajudar?"
                    aria-label="Mensagem"
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
                >
                  <Send className="size-4" aria-hidden />
                  Enviar pelo WhatsApp
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
