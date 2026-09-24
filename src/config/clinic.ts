/**
 * Arquivo central de configuração da Clínica Veterinária Dr. Kleber 24h.
 * Todos os textos institucionais, contatos, serviços e mídias ficam aqui.
 * Para atualizar o site, edite apenas este arquivo.
 */

import logo from "@/assets/logo.jpeg.asset.json";
import videoDrKleber from "@/assets/video-dr-kleber.mp4.asset.json";
import videoPoster from "@/assets/novo-espaco-capa.jpg.asset.json";
import fachadaAmpla from "@/assets/fachada-ampla.jpg.asset.json";
import fachadaEntrada from "@/assets/fachada-entrada.jpg.asset.json";
import fachadaPet from "@/assets/fachada-pet.jpg.asset.json";
import recepcao from "@/assets/recepcao.jpg.asset.json";
import drKleber from "@/assets/dr-kleber.jpg.asset.json";
import drKleberFilhote from "@/assets/dr-kleber-filhote.jpg.asset.json";
import drKleberConsulta from "@/assets/dr-kleber-consulta-cachorro.jpg.asset.json";
import drKleberConsultorio from "@/assets/dr-kleber-consultorio.jpg.asset.json";
import atendimentoGato1 from "@/assets/atendimento-gato-1.jpg.asset.json";
import atendimentoGato2 from "@/assets/atendimento-gato-2.jpg.asset.json";
import gatoRecuperacao from "@/assets/gato-recuperacao.jpg.asset.json";
import equipeFachada from "@/assets/equipe-fachada.jpg.asset.json";
import equipeCentroCirurgico from "@/assets/equipe-centro-cirurgico.jpg.asset.json";
import centroCirurgicoEquipe from "@/assets/centro-cirurgico-equipe.jpg.asset.json";
import centroCirurgicoProcedimento from "@/assets/centro-cirurgico-procedimento.jpg.asset.json";
import laboratorioIdexx from "@/assets/laboratorio-idexx.jpg.asset.json";
import eletrocardiograma from "@/assets/eletrocardiograma.jpg.asset.json";
import ultrassom from "@/assets/ultrassom.jpg.asset.json";
import corpoTecnico1 from "@/assets/corpo-tecnico-1.jpeg.asset.json";
import corpoTecnico2 from "@/assets/corpo-tecnico-2.jpeg.asset.json";
import corpoTecnico3 from "@/assets/corpo-tecnico-3.jpeg.asset.json";
import corpoTecnico4 from "@/assets/corpo-tecnico-4.jpeg.asset.json";
import corpoTecnico5 from "@/assets/corpo-tecnico-5.jpeg.asset.json";
import corpoTecnico6 from "@/assets/corpo-tecnico-6.jpeg.asset.json";

const phoneDigits = "5595981195702";

function wa(message: string) {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}

export const clinic = {
  name: "Clínica Veterinária Dr. Kleber 24h",
  shortName: "Dr. Kleber 24H",
  tagline: "Atendimento veterinário 24 horas em Boa Vista - RR",
  logo: logo.url,

  contact: {
    phoneLabel: "(95) 98119-5702",
    phoneHref: "tel:+5595981195702",
    whatsapp: wa(
      "Olá, vim pelo site da Clínica Veterinária Dr. Kleber 24h. Gostaria de atendimento para meu pet.",
    ),
    whatsappEmergency: wa(
      "Olá, preciso de atendimento veterinário 24h para meu pet. É uma emergência.",
    ),
    whatsappSchedule: wa(
      "Olá, gostaria de agendar uma consulta para meu pet na Clínica Veterinária Dr. Kleber 24h.",
    ),
    instagram: "https://www.instagram.com/clinicaveterinariadrkleber/",
    instagramHandle: "@clinicaveterinariadrkleber",
    facebook: "https://www.facebook.com/share/1DACf5nMJR/?mibextid=wwXIfr",
  },

  address: {
    street: "Av. Cap. Júlio Bezerra, 358",
    district: "Centro",
    city: "Boa Vista",
    state: "RR",
    zip: "69305-294",
    full: "Av. Cap. Júlio Bezerra, 358 - Centro, Boa Vista - RR, 69305-294",
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=Av.%20Cap.%20J%C3%BAlio%20Bezerra%2C%20358%20-%20Centro%2C%20Boa%20Vista%20-%20RR",
    mapsEmbed:
      "https://www.google.com/maps?q=Av.%20Cap.%20J%C3%BAlio%20Bezerra%2C%20358%20-%20Centro%2C%20Boa%20Vista%20-%20RR&output=embed",
  },

  hours: "Aberta 24 horas, todos os dias da semana",
  payments: "Débito, crédito, Pix e dinheiro",

  nav: [
    { label: "Início", href: "#inicio" },
    { label: "A Clínica", href: "#a-clinica" },
    { label: "Serviços", href: "#servicos" },
    { label: "Estrutura", href: "#estrutura" },
    { label: "Atendimento 24h", href: "#emergencia" },
    { label: "Contato", href: "#contato" },
  ],

  hero: {
    title: "Cuidado, carinho e dedicação em todos os momentos.",
    subtitle:
      "Na Clínica Veterinária Dr. Kleber 24h, seu melhor amigo encontra acolhimento e atendimento veterinário quando mais precisa.",
    image: drKleberConsulta.url,
    imageAlt: "Dr. Kleber em atendimento veterinário a um cachorro",
    secondaryImage: fachadaAmpla.url,
    secondaryImageAlt: "Fachada da Clínica Veterinária Dr. Kleber 24h",
  },

  about: {
    title:
      "Estrutura preparada para cuidar com carinho, segurança e profissionalismo.",
    paragraphs: [
      "A Clínica Veterinária Dr. Kleber 24h oferece atendimento médico e cirúrgico para cães e gatos, com suporte para consultas, prevenção, diagnóstico, internação e emergências.",
      "O atendimento funciona 24 horas por dia, todos os dias, no Centro de Boa Vista - RR, para acolher tutores e pets em qualquer momento — inclusive nas urgências que não têm hora marcada.",
    ],
    highlights: [
      "Recepção organizada e acolhedora",
      "Atendimento para cães e gatos",
      "Suporte médico, cirúrgico e laboratorial",
      "Ultrassom e eletrocardiograma",
    ],
    images: [
      { src: recepcao.url, alt: "Recepção da Clínica Veterinária Dr. Kleber" },
      {
        src: drKleberFilhote.url,
        alt: "Dr. Kleber segurando um filhote durante o atendimento",
      },
    ],
  },

  services: [
    {
      icon: "siren",
      title: "Emergência 24h",
      text: "Suporte para situações urgentes, todos os dias, a qualquer horário.",
    },
    {
      icon: "stethoscope",
      title: "Consultas veterinárias",
      text: "Avaliação clínica cuidadosa para entender as necessidades do seu pet.",
    },
    {
      icon: "syringe",
      title: "Vacinas essenciais",
      text: "Proteção para cães e gatos com acompanhamento profissional.",
    },
    {
      icon: "microscope",
      title: "Exames laboratoriais",
      text: "Resultados precisos em até 15 minutos para auxiliar no diagnóstico e no tratamento.",
    },
    {
      icon: "heart-pulse",
      title: "Eletrocardiograma",
      text: "Exame indolor para avaliar a saúde do coração e auxiliar no pré-cirúrgico.",
    },
    {
      icon: "scan",
      title: "Ultrassom",
      text: "Tecnologia para diagnósticos, acompanhamento gestacional e check-up.",
    },
    {
      icon: "hospital",
      title: "Internação",
      text: "Acompanhamento contínuo para pets que precisam de cuidados especiais.",
    },
    {
      icon: "scissors",
      title: "Cirurgias",
      text: "Procedimentos cirúrgicos com atenção, responsabilidade e estrutura adequada.",
    },
    {
      icon: "pill",
      title: "Farmácia veterinária",
      text: "Suporte com medicamentos veterinários para continuidade do tratamento.",
    },
  ],

  exams: {
    title: "Exames que ajudam a cuidar melhor do seu pet.",
    description:
      "Diagnóstico, acompanhamento e a estrutura de apoio da clínica para decisões mais rápidas e seguras.",
    cards: [
      {
        image: eletrocardiograma.url,
        title: "Eletrocardiograma",
        text: "Indicado para check-up, avaliação cardíaca e exames pré-cirúrgicos.",
      },
      {
        image: laboratorioIdexx.url,
        title: "Laboratório próprio",
        text: "Exames laboratoriais com mais agilidade para auxiliar no diagnóstico e acompanhamento do pet.",
        featured: true,
      },
      {
        image: ultrassom.url,
        title: "Ultrassom",
        text: "Exame seguro e não invasivo para investigação, prevenção e acompanhamento clínico.",
      },
    ],
    list: [
      "Hemograma completo",
      "Bioquímicos",
      "Ultrassonografia",
      "Eletrocardiograma",
      "Pré-cirúrgicos",
      "Diagnóstico laboratorial",
    ],
  },

  surgery: {
    title: "Procedimentos com técnica, monitoramento e segurança.",
    text: "Área dedicada a cirurgias e procedimentos veterinários, com equipe preparada para os momentos mais delicados.",
    points: [
      "Procedimentos cirúrgicos veterinários",
      "Equipe preparada para momentos delicados",
      "Suporte para pré e pós-operatório",
      "Atendimento com responsabilidade e dedicação",
    ],
    mainImage: centroCirurgicoProcedimento.url,
    gallery: [
      {
        src: centroCirurgicoEquipe.url,
        alt: "Equipe em procedimento cirúrgico veterinário",
      },
      {
        src: equipeCentroCirurgico.url,
        alt: "Equipe no centro cirúrgico da clínica",
      },
    ],
  },

  team: {
    title: "Corpo técnico",
    description: "Profissionais que cuidam do seu pet todos os dias.",
    photos: [
      { src: corpoTecnico1.url, alt: "Corpo técnico da Clínica Dr. Kleber" },
      { src: corpoTecnico2.url, alt: "Corpo técnico da Clínica Dr. Kleber" },
      { src: corpoTecnico3.url, alt: "Corpo técnico da Clínica Dr. Kleber" },
      { src: corpoTecnico4.url, alt: "Corpo técnico da Clínica Dr. Kleber" },
      { src: corpoTecnico5.url, alt: "Corpo técnico da Clínica Dr. Kleber" },
      { src: corpoTecnico6.url, alt: "Corpo técnico da Clínica Dr. Kleber" },
    ],
  },

  gallery: [
    {
      label: "Fachada e recepção",
      title: "Chegada, acolhimento e primeiro atendimento.",
      photos: [
        {
          src: fachadaAmpla.url,
          alt: "Fachada ampla da Clínica Veterinária Dr. Kleber",
        },
        {
          src: fachadaEntrada.url,
          alt: "Entrada da Clínica Veterinária Dr. Kleber",
        },
        { src: recepcao.url, alt: "Recepção da clínica" },
        { src: fachadaPet.url, alt: "Fachada da clínica com pet" },
      ],
    },
    {
      label: "Dr. Kleber e atendimentos",
      title: "Consultas, cuidado próximo e atendimento aos pets.",
      photos: [
        { src: drKleberFilhote.url, alt: "Dr. Kleber com filhote" },
        { src: drKleberConsulta.url, alt: "Dr. Kleber atendendo cachorro" },
        {
          src: drKleberConsultorio.url,
          alt: "Dr. Kleber em consulta veterinária",
        },
        { src: atendimentoGato1.url, alt: "Atendimento veterinário com gato" },
      ],
    },
    {
      label: "Equipe e rotina",
      title: "Profissionais em atendimento e momentos reais da clínica.",
      photos: [
        {
          src: equipeFachada.url,
          alt: "Equipe da Clínica Veterinária Dr. Kleber",
        },
        { src: atendimentoGato2.url, alt: "Veterinária cuidando de gato" },
        {
          src: gatoRecuperacao.url,
          alt: "Gato em recuperação com suporte de mobilidade",
        },
      ],
    },
  ],

  reviews: {
    rating: "4,7",
    count: "233",
    profileLink:
      "https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica%20Veterin%C3%A1ria%20Dr.%20Kleber%2024h%20Boa%20Vista%20RR",
    items: [
      {
        quote:
          "Sempre que levei meus pets quando dodóis, eles ficaram sarados. Eu confio nessa equipe.",
        author: "Guiomar Vilela",
      },
      {
        quote:
          "Profissionais de primeira, atenção com meu pet desde o primeiro momento. Excelente atendimento.",
        author: "Yrlian Gamboa",
      },
      {
        quote:
          "Meus pets sempre foram atendidos na clínica, eu confio e indico de olhos fechados.",
        author: "Ana Carolina Macêdo",
      },
    ],
  },

  video: {
    src: videoDrKleber.url,
    poster: videoPoster.url,
    title: "Conheça de perto a rotina da Clínica Veterinária Dr. Kleber 24h.",
    description:
      "Veja um pouco do atendimento, da estrutura e do cuidado diário com os pets.",
    doctor: {
      name: "Dr. Kleber",
      role: "Médico veterinário",
      photo: drKleber.url,
      text: "Atendimento veterinário 24 horas para cães e gatos, com suporte em consultas, emergências, exames, internação e procedimentos cirúrgicos.",
    },
  },
} as const;
