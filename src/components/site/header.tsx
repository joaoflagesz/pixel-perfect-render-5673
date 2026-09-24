import { useEffect, useState } from "react";
import { Menu, Phone, X, MessageCircle, Clock } from "lucide-react";
import { clinic } from "@/config/clinic";
import { Container } from "./primitives";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-deep text-deep-foreground">
        <Container className="flex h-9 items-center justify-between gap-3 text-[0.72rem] sm:text-xs">
          <p className="flex items-center gap-2 font-medium tracking-wide">
            <Clock className="size-3.5 text-gold" aria-hidden />
            Atendimento veterinário 24 horas
          </p>
          <a
            href={clinic.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-semibold text-gold transition-opacity hover:opacity-80"
          >
            <MessageCircle className="size-3.5" aria-hidden />
            WhatsApp
          </a>
        </Container>
      </div>

      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-border/70 bg-background/85 shadow-soft backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <a href="#inicio" className="flex items-center gap-3">
            <img
              src={clinic.logo}
              alt={`Logotipo ${clinic.name}`}
              width={44}
              height={44}
              className="size-10 rounded-full object-cover ring-1 ring-border lg:size-11"
            />
            <span className="font-display text-sm leading-tight font-semibold sm:text-base">
              Dr. Kleber
              <span className="ml-1 text-primary">24H</span>
              <span className="block text-[0.65rem] font-normal tracking-[0.16em] text-muted-foreground uppercase">
                Clínica Veterinária
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {clinic.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={clinic.contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
            >
              <Phone className="size-4" aria-hidden />
              {clinic.contact.phoneLabel}
            </a>
            <a
              href={clinic.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="size-4" aria-hidden />
              Falar com a clínica
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </Container>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-deep/97 px-6 pt-6 pb-10 text-deep-foreground backdrop-blur-sm lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-base font-semibold">
              Dr. Kleber <span className="text-gold">24H</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-deep-foreground/20"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <nav className="mt-10 flex flex-col">
            {clinic.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-deep-foreground/10 py-4 font-display text-xl font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 grid gap-3">
            <a
              href={clinic.contact.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-deep-foreground/25 py-3.5 font-semibold"
            >
              <Phone className="size-4" aria-hidden />
              {clinic.contact.phoneLabel}
            </a>
            <a
              href={clinic.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3.5 font-semibold text-whatsapp-foreground"
            >
              <MessageCircle className="size-4" aria-hidden />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
