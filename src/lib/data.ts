const px = (id: string, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

/** srcset Pexels com 3 densidades para i(o) browser escolher por viewport */
const pxSet = (id: string, w: number, h: number) =>
  [0.5, 1, 1.5]
    .map((k) => `${px(id, Math.round(w * k), Math.round(h * k))} ${Math.round(w * k)}w`)
    .join(", ");

export const srcset = {
  hero: pxSet("35105471", 2000, 1200),
  farmAerial: pxSet("13804966", 1100, 1400),
  farmWind: pxSet("35105460", 1600, 900),
};

export const img = {
  hero: px("35105471", 2000, 1200),
  farmAerial: px("13804966", 1100, 1400),
  farmWind: px("35105460", 1600, 900),
  fieldPanels: px("20844067", 900, 900),
  roofInstall: px("11645008", 900, 900),
  technician: px("4254164", 900, 900),
  closeup: px("33379361", 900, 900),
  team: px("14614266", 1200, 900),
  house: px("13558357", 1200, 900),
  houseSuburb: px("12243093", 1000, 1000),
  roofTiles: px("17965455", 1000, 1000),
  houses: px("6233727", 1200, 900),
  housesSm: px("6233727", 300, 240),
  farmAerialSm: px("13804966", 380, 475),
  farmWindSm: px("35105460", 500, 312),
  closeupSm: px("33379361", 500, 500),
  roofInstallSm: px("11645008", 500, 500),
  inspector: px("4254166", 1000, 1000),
};

export const features = [
  {
    title: "Projeto Sob Medida",
    text: "Engenharia própria: dimensionamos cada sistema pelo seu consumo real e pela irradiação do seu telhado.",
    image: img.closeupSm,
  },
  {
    title: "Feito para Escalar",
    text: "De 4 kWp residenciais a usinas de vários MWp — o mesmo padrão de qualidade em qualquer porte.",
    image: img.farmWindSm,
    accent: true,
  },
  {
    title: "Garantia de 25 Anos",
    text: "Módulos com 25 anos de performance, inversores de 12 anos e monitoramento vitalício pelo app.",
    image: img.roofInstallSm,
  },
];

export const steps = [
  {
    n: "01",
    label: "Análise e simulação",
    title: "Entendemos o seu consumo",
    text: "Analisamos 12 meses da sua conta de luz, o perfil de consumo e a irradiação solar da sua região para desenhar o sistema ideal — sem superdimensionar.",
    image: img.inspector,
    bullets: ["Leitura da fatura", "Estudo de irradiação", "Proposta em 24h"],
  },
  {
    n: "02",
    label: "Projeto de engenharia",
    title: "Desenhamos cada detalhe",
    text: "Projeto elétrico assinado por engenheiro, estudo estrutural do telhado, escolha de módulos e inversores e simulação de geração mês a mês.",
    image: img.technician,
    bullets: ["ART emitida", "Estudo estrutural", "Simulação de geração"],
  },
  {
    n: "03",
    label: "Instalação certificada",
    title: "Instalamos em poucos dias",
    text: "Equipes próprias, certificadas NR-10 e NR-35. A instalação residencial média leva de 2 a 4 dias, com obra limpa e sem surpresas.",
    image: img.roofInstall,
    bullets: ["Equipe própria", "2 a 4 dias", "Obra limpa"],
  },
  {
    n: "04",
    label: "Homologação e monitoramento",
    title: "Cuidamos de tudo até ligar",
    text: "Fazemos toda a homologação junto à concessionária e acompanhamos a geração pelo app, com alertas automáticos de desempenho.",
    image: img.team,
    bullets: ["Homologação inclusa", "App de monitoramento", "Suporte vitalício"],
  },
];

export const segments = [
  {
    title: "Residencial",
    text: "Sistemas de 3 a 15 kWp para casas e condomínios, com estética limpa e retorno médio em 3 anos.",
    image: img.houseSuburb,
    tag: "3 – 15 kWp",
  },
  {
    title: "Comercial",
    text: "Reduza o maior custo fixo da sua operação. Projetos em telhados metálicos, lajes e estacionamentos.",
    image: img.roofTiles,
    tag: "15 – 500 kWp",
  },
  {
    title: "Rural & Agro",
    text: "Energia para irrigação, aviários e silos, com estruturas de solo e tarifa rural otimizada.",
    image: img.fieldPanels,
    tag: "Solo e telhado",
  },
  {
    title: "Usinas & GD",
    text: "Geração distribuída, mercado livre e locação de usinas para quem quer escalar produção de energia.",
    image: img.farmWind,
    tag: "1 MWp +",
  },
];

export const stats = [
  { value: "2.480+", label: "sistemas instalados" },
  { value: "38 MWp", label: "de potência em operação" },
  { value: "R$ 91 mi", label: "economizados por clientes" },
  { value: "4,9/5", label: "avaliação média" },
];

export const faq = [
  {
    cat: "instalacao",
    q: "Funciona em dias nublados ou à noite?",
    a: "Sim. Em dias nublados a geração cai, mas continua existindo. À noite você consome da rede usando os créditos gerados durante o dia — o sistema de compensação da ANEEL garante isso por 60 meses.",
  },
  {
    cat: "instalacao",
    q: "Preciso de baterias?",
    a: "Não é obrigatório. A rede funciona como sua 'bateria' através dos créditos de energia. Mas oferecemos sistemas híbridos com baterias para quem quer autonomia em quedas de energia.",
  },
  {
    cat: "instalacao",
    q: "Vocês cuidam da homologação na concessionária?",
    a: "Sim, do início ao fim. Projeto, ART, protocolo, vistoria e troca do medidor estão inclusos — você não precisa falar com a concessionária.",
  },
  {
    cat: "financeiro",
    q: "Quanto custa instalar energia solar?",
    a: "O investimento depende do seu consumo. Um sistema residencial típico de 5 kWp fica entre R$ 18.000 e R$ 24.000 instalado e homologado. Use o simulador acima para uma estimativa personalizada em segundos.",
  },
  {
    cat: "financeiro",
    q: "Em quanto tempo o investimento se paga?",
    a: "Na maioria dos projetos o retorno acontece entre 2,5 e 4 anos. Depois disso, o sistema continua gerando energia praticamente de graça por mais de duas décadas.",
  },
  {
    cat: "manutencao",
    q: "Qual a manutenção necessária?",
    a: "Muito baixa: limpeza dos módulos 1 a 2 vezes por ano e inspeção elétrica anual. Todos os nossos clientes têm monitoramento remoto com alertas automáticos de queda de geração.",
  },
  {
    cat: "manutencao",
    q: "Como acompanho a geração depois da instalação?",
    a: "Pelo app você vê a geração em tempo real, o histórico mês a mês e a economia acumulada. Se a produção cair fora do esperado, o sistema dispara um alerta e nossa equipe técnica entra em ação.",
  },
];

export const testimonials = [
  {
    quote: "A conta caiu de R$ 1.340 para R$ 78. Em três anos o sistema se paga e ainda valorizou o imóvel.",
    name: "Carla Menezes",
    role: "Residencial · Campinas/SP",
    color: "bg-azure-deep",
  },
  {
    quote: "Instalaram 186 kWp no telhado da fábrica sem parar a produção um dia sequer. Execução impecável.",
    name: "Rodrigo Sales",
    role: "Indústria · Joinville/SC",
    color: "bg-night",
  },
  {
    quote: "O pivô de irrigação era inviável com a tarifa antiga. Hoje produzimos a nossa própria energia.",
    name: "Jonas Ribeiro",
    role: "Agro · Rio Verde/GO",
    color: "bg-azure",
  },
];

export const regions = [
  { name: "Norte", hsp: 4.8 },
  { name: "Nordeste", hsp: 5.5 },
  { name: "Centro-Oeste", hsp: 5.2 },
  { name: "Sudeste", hsp: 4.8 },
  { name: "Sul", hsp: 4.3 },
];

export const profiles = [
  { name: "Residencial", tariff: 0.98, pricePerKwp: 4100 },
  { name: "Comercial", tariff: 0.92, pricePerKwp: 3600 },
  { name: "Rural", tariff: 0.78, pricePerKwp: 3900 },
];
