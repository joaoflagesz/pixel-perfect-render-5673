import { Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { clinic } from "@/config/clinic";
import { Container } from "./primitives";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep pt-16 pb-28 text-deep-foreground lg:pb-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src={clinic.logo}
                alt={`Logotipo ${clinic.name}`}
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
              <span className="font-display text-base font-semibold">
                Dr. Kleber <span className="text-gold">24H</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-deep-foreground/70">
              Clínica veterinária com atendimento médico e cirúrgico para cães e
              gatos, aberta 24 horas no Centro de Boa Vista - RR.
            </p>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">
              Navegação
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {clinic.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-deep-foreground/75 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-gold uppercase">
              Contato
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={clinic.contact.phoneHref}
                  className="inline-flex items-center gap-2 text-deep-foreground/75 transition-colors hover:text-gold"
                >
                  <Phone className="size-4" aria-hidden />
                  {clinic.contact.phoneLabel}
                </a>
              </li>
              <li>
                <a
                  href={clinic.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-deep-foreground/75 transition-colors hover:text-gold"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={clinic.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-deep-foreground/75 transition-colors hover:text-gold"
                >
                  <Instagram className="size-4" aria-hidden />
                  {clinic.contact.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={clinic.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-deep-foreground/75 transition-colors hover:text-gold"
                >
                  <Facebook className="size-4" aria-hidden />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={clinic.address.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-deep-foreground/75 transition-colors hover:text-gold"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {clinic.address.full}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-deep-foreground/12 pt-6 text-xs text-deep-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {clinic.name}. Todos os direitos reservados.
          </p>
          <p>{clinic.hours}</p>
        </div>
      </Container>
    </footer>
  );
}

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-2.5 backdrop-blur-lg lg:hidden">
      <div className="flex gap-2.5">
        <a
          href={clinic.contact.phoneHref}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-primary/25 py-3 text-sm font-semibold text-primary"
        >
          <Phone className="size-4" aria-hidden />
          Ligar
        </a>
        <a
          href={clinic.contact.whatsappEmergency}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp py-3 text-sm font-semibold text-whatsapp-foreground"
        >
          <MessageCircle className="size-4" aria-hidden />
          WhatsApp 24h
        </a>
      </div>
    </div>
  );
}
