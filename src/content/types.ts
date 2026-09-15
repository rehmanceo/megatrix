export type Locale = "us" | "se";

export interface NavLink {
  label: string;
  href: string;
}

export interface Cta {
  label: string;
  sublabel?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export interface SystemStep {
  index: string;
  title: string;
  description: string;
}

export interface ProblemItem {
  title: string;
  description: string;
}

export interface TransformationItem {
  before: string;
  after: string;
}

export interface AiCapability {
  title: string;
  description: string;
  controlled: "ai" | "human" | "shared";
}

export interface ChannelCard {
  title: string;
  description: string;
  bestFor: string;
}

export interface OfferComponent {
  name: string;
  summary: string;
  includes: string[];
}

export interface WhoItem {
  text: string;
}

export interface CalculatorCopy {
  eyebrow: string;
  title: string;
  description: string;
  leadsLabel: string;
  jobValueLabel: string;
  estimateRateLabel: string;
  closeRateLabel: string;
  resultHeadline: string;
  lostOpportunitiesLabel: string;
  lostRevenueLabel: string;
  disclaimer: string;
  ctaText: string;
  currencySymbol: string;
  currencyPosition: "prefix" | "suffix";
}

export interface FormCopy {
  eyebrow: string;
  title: string;
  description: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  companyLabel: string;
  locationLabel: string;
  locationPlaceholder: string;
  segmentLabel: string;
  segmentResidential: string;
  segmentCommercial: string;
  volumeLabel: string;
  volumeOptions: string[];
  challengeLabel: string;
  challengePlaceholder: string;
  websiteLabel: string;
  submitLabel: string;
  submittingLabel: string;
  privacyNote: string;
  errorRequired: string;
  errorEmail: string;
  errorPhone: string;
  genericError: string;
}

export interface ThankYouCopy {
  eyebrow: string;
  title: string;
  description: string;
  steps: { title: string; description: string }[];
  calendarPrompt: string;
  calendarCtaLabel: string;
  calendarHeading: string;
  calendarIntro: string;
  popupTitle: string;
  popupBody: string;
  popupCloseLabel: string;
  backHref: string;
  backLabel: string;
}

export interface LandingContent {
  locale: Locale;
  htmlLang: string;
  siteName: string;
  market: {
    label: string;
    flagEmoji: string;
    switchLabel: string;
  };
  meta: {
    title: string;
    description: string;
    ogAlt: string;
  };
  announcement: string;
  nav: {
    links: NavLink[];
    ctaLabel: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    highlight: string;
    subheadline: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    proofLine: string;
    diagram: {
      stages: string[];
      caption: string;
    };
  };
  credibility: {
    title: string;
    items: { title: string; description: string }[];
  };
  problem: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ProblemItem[];
  };
  calculator: CalculatorCopy;
  transformation: {
    eyebrow: string;
    title: string;
    intro: string;
    beforeLabel: string;
    afterLabel: string;
    items: TransformationItem[];
  };
  system: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: SystemStep[];
  };
  ai: {
    eyebrow: string;
    title: string;
    intro: string;
    disclaimer: string;
    capabilities: AiCapability[];
    legendAi: string;
    legendHuman: string;
    legendShared: string;
  };
  automation: {
    eyebrow: string;
    title: string;
    intro: string;
    manualTitle: string;
    manualSteps: string[];
    automatedTitle: string;
    automatedSteps: string[];
  };
  channels: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: ChannelCard[];
    note: string;
  };
  whoFor: {
    title: string;
    items: WhoItem[];
  };
  whoNotFor: {
    title: string;
    items: WhoItem[];
  };
  proof: {
    eyebrow: string;
    title: string;
    intro: string;
    placeholderTitle: string;
    placeholderBody: string;
    caseStudyPlaceholderTitle: string;
    caseStudyPlaceholderBody: string;
  };
  guarantee: {
    eyebrow: string;
    title: string;
    intro: string;
    pillars: { title: string; description: string }[];
    disclaimer: string;
  };
  offer: {
    eyebrow: string;
    title: string;
    intro: string;
    components: OfferComponent[];
    pricingNote: string;
  };
  mission: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  faq: {
    eyebrow: string;
    title: string;
    groups: FaqGroup[];
  };
  finalCta: {
    title: string;
    description: string;
    primaryCta: Cta;
    secondaryNote: string;
  };
  form: FormCopy;
  thankYou: ThankYouCopy;
  footer: {
    tagline: string;
    systemLabel: string;
    systemLinks: NavLink[];
    marketsLabel: string;
    companyLabel: string;
    companyLinks: NavLink[];
    legalLinks: NavLink[];
    disclaimer: string;
  };
  sticky: {
    ctaLabel: string;
  };
  legal: {
    privacyTitle: string;
    privacyBody: string[];
    termsTitle: string;
    termsBody: string[];
  };
}
