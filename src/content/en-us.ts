import type { LandingContent } from "./types";

export const enUs: LandingContent = {
  locale: "us",
  htmlLang: "en-US",
  siteName: "Megatrix",
  market: {
    label: "United States",
    flagEmoji: "🇺🇸",
    switchLabel: "🇺🇸 United States",
  },
  meta: {
    title: "The Lead-to-Job System for Heat Pump Installers | Megatrix",
    description:
      "Megatrix builds and runs the lead-to-job system for residential heat pump installers: instant response, AI-assisted qualification, automated follow-up, and full pipeline visibility. Get a free growth assessment.",
    ogAlt: "Lead-to-job pipeline diagram for heat pump installers",
  },
  announcement: "We partner with one heat pump installer per service area.",
  nav: {
    links: [
      { label: "How It Works", href: "#system" },
      { label: "AI & Automation", href: "#ai" },
      { label: "Guarantee", href: "#guarantee" },
      { label: "FAQ", href: "#faq" },
    ],
    ctaLabel: "Get My Free Assessment",
  },
  hero: {
    eyebrow: "For Residential Heat Pump Installers",
    headline: "Every unanswered lead",
    highlight: "is a heat pump you didn't install.",
    subheadline:
      "Megatrix builds and runs the lead-to-job system for residential heat pump installers — instant response, AI-assisted qualification, booked appointments, and automated estimate follow-up, so fewer leads slip through the cracks.",
    primaryCta: { label: "Get My Free Growth Assessment", sublabel: "20 minutes · no cost · no obligation" },
    secondaryCta: { label: "See How the System Works" },
    proofLine:
      "Built on enterprise-grade CRM and automation infrastructure. Every AI-assisted action is logged and reviewed by your team.",
    diagram: {
      stages: ["New Lead", "Instant Response", "Qualified", "Estimate Booked", "Follow-Up", "Job Won"],
      caption: "What happens automatically after a homeowner reaches out",
    },
  },
  credibility: {
    title: "Not another marketing agency. An operating system for your sales process.",
    items: [
      {
        title: "Purpose-built for heat pumps",
        description:
          "Every workflow is written around how residential heat pump jobs actually get sold — not a generic home-service template.",
      },
      {
        title: "Human-supervised AI",
        description: "AI drafts, qualifies, and responds fast. Your team stays in control of every quote and close.",
      },
      {
        title: "Full attribution",
        description:
          "Every lead is tracked from first click to closed job, so you know exactly which channels are worth paying for.",
      },
    ],
  },
  segmentSwitch: {
    label: "This page is written for:",
    residential: "Residential Installers",
    commercial: "Commercial / Multi-Family",
    commercialNote:
      "We also work with commercial and multi-family heat pump contractors. The mechanics are similar — the sales cycle, stakeholders, and volumes are different. Tell us about your business on the assessment call and we'll tailor it accordingly.",
  },
  problem: {
    eyebrow: "The Problem",
    title: "Your marketing is working. Your follow-up is leaking.",
    intro:
      "Most heat pump installers don't have a lead problem. They have a response and follow-up problem — and it's costing installs every week.",
    items: [
      {
        title: "Fewer leads, higher stakes",
        description:
          "The federal tax credit that used to nudge homeowners off the fence expired at the end of 2025. The homeowners reaching out today are more serious — but there are fewer of them, and every installer in your market is chasing the same inquiry. Losing one to slow response costs more than it used to.",
      },
      {
        title: "Leads come in while your crew is on a roof",
        description:
          "A homeowner calls or fills out a form mid-afternoon. Nobody's at a desk. By the time someone calls back, they've already booked with whoever answered first.",
      },
      {
        title: "Quotes get sent... and forgotten",
        description:
          "You send a solid estimate, then move on to the next job. Nothing reminds anyone to follow up in 3 days, a week, or three weeks — so warm leads go cold.",
      },
      {
        title: "Leads live across texts, voicemails, and a spreadsheet",
        description:
          "Without one place to see every lead's status, opportunities fall through the cracks and nobody notices until the customer signs with someone else.",
      },
      {
        title: "You're paying for leads that never get worked",
        description:
          "Ad spend and lead sources only pay off if every lead gets a fast, consistent response. Slow follow-up quietly erodes your cost per install.",
      },
      {
        title: "You're the bottleneck",
        description:
          "If growth depends on you personally remembering to call people back, the business can't scale past your calendar.",
      },
    ],
  },
  calculator: {
    eyebrow: "The Cost of Inaction",
    title: "What is slow follow-up actually costing you?",
    description:
      "Enter your own numbers below. This is a simplified illustration of the mechanism — not an industry benchmark or a guarantee.",
    leadsLabel: "Inbound leads per month",
    jobValueLabel: "Average job value",
    estimateRateLabel: "% of leads that reach an estimate",
    closeRateLabel: "% of estimates that close",
    resultHeadline: "Estimated monthly impact of a 20% improvement in response & follow-up",
    lostOpportunitiesLabel: "Estimated additional jobs / month",
    lostRevenueLabel: "Estimated additional revenue / month",
    disclaimer:
      "This is a simplified illustration using the numbers you enter — not a guarantee, forecast, or industry benchmark. Your actual results depend on your market, pricing, and team.",
    ctaText: "Want to see what this looks like with your real numbers?",
    currencySymbol: "$",
    currencyPosition: "prefix",
  },
  transformation: {
    eyebrow: "Before / After",
    title: "From leaking leads to a closed-loop sales process",
    intro:
      "This is the difference between hoping your team remembers to follow up, and knowing the system will.",
    beforeLabel: "Without a system",
    afterLabel: "With the Lead-to-Job System",
    items: [
      { before: "Lead arrives, nobody responds for hours", after: "Instant automated response, day or night" },
      { before: "Manual, inconsistent follow-up", after: "Scheduled, automated follow-up sequences" },
      { before: "Leads tracked in texts and spreadsheets", after: "Every lead visible in one pipeline" },
      { before: "Quotes sent and forgotten", after: "Estimates followed up automatically until won or closed out" },
      { before: "No visibility into what's working", after: "Clear reporting on source, response time, and close rate" },
      { before: "The owner is the follow-up system", after: "The system runs whether or not you're at your desk" },
    ],
  },
  system: {
    eyebrow: "The System",
    title: "How the Lead-to-Job System works",
    intro: "Eight components. One connected system, built around how heat pump jobs actually get sold.",
    steps: [
      { index: "01", title: "Generate", description: "We help determine the right mix of Google, Meta, and existing channels for your market — not every channel by default." },
      { index: "02", title: "Capture", description: "Calls, forms, texts, and missed calls all flow into a single system instead of getting lost across inboxes." },
      { index: "03", title: "Respond", description: "Every new lead gets an instant automated reply within seconds — so you're never the installer who called back too late." },
      { index: "04", title: "Qualify", description: "AI-assisted qualification asks the right questions so your team spends time on real opportunities, not tire-kickers." },
      { index: "05", title: "Book", description: "Booking is handled automatically, with confirmations and reminders that reduce no-shows." },
      { index: "06", title: "Follow Up", description: "Scheduled follow-up sequences keep your estimate top of mind until the homeowner decides — without anyone having to remember." },
      { index: "07", title: "Convert", description: "Every lead's status is visible in one pipeline, so nothing falls through the cracks and coaching is based on real data." },
      { index: "08", title: "Improve", description: "Monthly reporting on lead source, response time, and conversion shows what's working and what to fix next." },
    ],
  },
  ai: {
    eyebrow: "AI, Used Honestly",
    title: "AI handles the repetitive work. Your team makes the decisions that matter.",
    intro:
      "We don't market AI as magic, and we don't use it to replace your sales team. It's there so nothing falls through the cracks.",
    disclaimer: "Every AI-assisted message is visible to your team and can be reviewed, edited, or taken over at any time.",
    legendAi: "AI-Handled",
    legendHuman: "Always Human",
    legendShared: "AI-Assisted, Human-Reviewed",
    capabilities: [
      { title: "Instant lead response", description: "Acknowledges every new lead within seconds, in your business's voice.", controlled: "ai" },
      { title: "Missed-call text-back", description: "Automatically texts anyone whose call you miss, before they call your competitor.", controlled: "ai" },
      { title: "Lead qualification", description: "Asks basic qualifying questions (property type, system age, timeline) before a human gets involved.", controlled: "shared" },
      { title: "Appointment scheduling", description: "Offers available times and books confirmed appointments directly into your calendar.", controlled: "ai" },
      { title: "FAQ handling", description: "Answers common questions (financing, service area, timelines) using information you approve.", controlled: "ai" },
      { title: "Estimate follow-up", description: "Sends scheduled follow-up on open quotes — your team decides when to step in personally.", controlled: "shared" },
      { title: "Pricing, negotiation, and closing", description: "Always handled by your team. AI never negotiates price or closes a sale.", controlled: "human" },
      { title: "Internal notifications", description: "Flags hot leads and stalled quotes to your team in real time.", controlled: "ai" },
    ],
  },
  automation: {
    eyebrow: "Automation",
    title: "What used to depend on memory now runs on its own",
    intro: "The steps don't change. What changes is whether they depend on a person remembering to do them.",
    manualTitle: "The manual way",
    manualSteps: [
      "Lead arrives",
      "An employee happens to notice it",
      "Employee replies, whenever they get to it",
      "Employee manually qualifies the lead",
      "Employee remembers to follow up (sometimes)",
      "Employee remembers to book the appointment",
      "Quote follow-up depends on someone remembering",
    ],
    automatedTitle: "The system way",
    automatedSteps: [
      "Lead arrives",
      "Instant automated response",
      "AI-assisted qualification",
      "Appointment booked with reminders",
      "Scheduled follow-up sequence begins",
      "Pipeline updates automatically",
      "Team is notified only when a human decision is needed",
    ],
  },
  channels: {
    eyebrow: "Lead Generation",
    title: "The right channels for your market — not every channel by default",
    intro: "Not every heat pump installer needs the same channels. Here's how we think about the two paid options.",
    cards: [
      { title: "Google Ads & Local Services", description: "Captures homeowners actively searching for heat pump installation or replacement in your service area.", bestFor: "High-intent, ready-to-buy demand" },
      { title: "Meta Ads", description: "Builds awareness and captures demand from homeowners who haven't started searching yet — useful for seasonal offers and financing promotions.", bestFor: "Awareness and volume in less competitive markets" },
      { title: "Your existing channels", description: "Referrals, past customers, and current lead sources get folded into the same system so nothing is tracked separately.", bestFor: "Businesses with existing lead flow that needs better handling" },
    ],
    note: "The right mix depends on your market, competition, and budget. We determine that during the assessment — we don't default every client into the same channels.",
  },
  whoFor: {
    title: "This is built for heat pump installers who:",
    items: [
      { text: "Are already an established, operating business" },
      { text: "Have the crew capacity to take on more installs" },
      { text: "Get inbound inquiries but struggle to respond to and follow up on all of them" },
      { text: "Want less manual admin, not more software to babysit" },
      { text: "Want a repeatable, trackable sales process instead of relying on memory" },
    ],
  },
  whoNotFor: {
    title: "This is probably not a fit if you:",
    items: [
      { text: "Are a brand-new business with no track record or installation capacity yet" },
      { text: "Can't take on additional jobs right now" },
      { text: "Aren't willing to have leads contacted quickly, by your team or an assisted system" },
      { text: "Are looking for the cheapest possible ad spend, not a sales process" },
      { text: "Don't have a defined service area or the licensing to operate in it" },
    ],
  },
  proof: {
    eyebrow: "Proof",
    title: "We'd rather show you the mechanism than fake the results",
    intro:
      "We're early in our work with heat pump installer partners, and we're not going to invent testimonials, logos, or numbers to look more established than we are. Here's what we can show you honestly today:",
    placeholderTitle: "[Verified client testimonials — coming soon]",
    placeholderBody:
      "As we complete installer partnerships, real testimonials with names, companies, and measurable results will appear here. Ask us for current references on your assessment call.",
    caseStudyPlaceholderTitle: "[Verified case study — coming soon]",
    caseStudyPlaceholderBody:
      "Full case studies — problem, system, implementation, result — will be published here once completed and approved by the client.",
  },
  guarantee: {
    eyebrow: "Guarantee",
    title: "A guarantee based on what we actually control",
    intro:
      "We won't promise a number of leads, sales, or a revenue increase — nobody can honestly guarantee homeowner behavior, and we're not going to pretend otherwise. Here's what we do guarantee:",
    pillars: [
      { title: "Launch Guarantee", description: "Your system is fully built, tested, and live within the agreed implementation window — or that month's fee is waived." },
      { title: "Response-Time Guarantee", description: "Every lead that enters your system gets an automated first response within 60 seconds, 24/7. If it doesn't, we fix it at no charge." },
      { title: "Full Transparency", description: "You get access to see every automation, every AI conversation, and every report we build — nothing is a black box." },
    ],
    disclaimer: "Full guarantee terms are confirmed in writing before you sign anything. Guarantee terms are subject to final legal review.",
  },
  offer: {
    eyebrow: "The Offer",
    title: "One system. Built and operated for you.",
    intro:
      "Pricing depends on your market, current setup, and channel needs — it's confirmed on your assessment call, not guessed at on a website. Here's what's included.",
    components: [
      { name: "Foundation", summary: "The infrastructure everything else runs on.", includes: ["CRM & pipeline setup", "Call & lead tracking", "High-converting landing pages", "Website conversion audit"] },
      { name: "Lead Engine", summary: "Bringing in qualified local demand.", includes: ["Google Ads / Local Services Ads (where it fits)", "Meta Ads (where it fits)", "Lead capture forms", "Channel mix recommendation for your market"] },
      { name: "Conversion Engine", summary: "Turning inquiries into booked appointments.", includes: ["Instant lead response", "AI-assisted qualification", "Missed-call text-back", "Automated appointment booking"] },
      { name: "Sales Follow-Up", summary: "Keeping estimates and prospects alive.", includes: ["Automated estimate follow-up", "Lead nurture sequences", "Past-customer reactivation", "Review & referral requests"] },
      { name: "Reporting & Optimization", summary: "Knowing what's actually working.", includes: ["Monthly performance reporting", "Lead source attribution", "Ongoing testing and refinement"] },
    ],
    pricingNote: "No published pricing tiers — this is a built system, not an off-the-shelf package. You'll get a specific number after the assessment, based on your market and scope.",
  },
  mission: {
    eyebrow: "Why We Built This",
    title:
      "Heat pumps are one of the best products in home services to sell right now. Most installers still lose the sale after the homeowner already said yes to an estimate.",
    paragraphs: [
      "Heat pump demand is growing — driven by aging systems, rising homeowner awareness, and the ongoing shift away from oil and old electric resistance heat. But more demand doesn't automatically mean more installs. It means more competition for the same homeowner's attention.",
      "We built this system because the businesses that win in this market usually aren't the ones with the biggest ad budget. They're the ones who respond first, follow up consistently, and never let a quote go cold.",
      "[Founder background and company history — to be added once provided.]",
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions before you book",
    groups: [
      {
        title: "Getting Started",
        items: [
          { q: "Who is this for?", a: "Established residential heat pump installers who already get inbound leads but struggle to respond to and follow up on all of them consistently. See the \"who this is for\" section above for specifics." },
          { q: "Do you generate leads, or just handle the ones I already have?", a: "Both, depending on what you need. Some installers need more lead volume; others already get enough leads but lose too many to slow follow-up. We assess which is true for you before recommending anything." },
          { q: "How quickly can we launch?", a: "Most of the core system — CRM, instant response, booking — can be live within a few weeks of onboarding. Paid ad campaigns, if included, typically take longer to ramp as we test what works in your market." },
          { q: "What markets do you serve?", a: "We currently work with residential installers in the US, and we're expanding into the Swedish market. We also support commercial and multi-family heat pump contractors." },
        ],
      },
      {
        title: "How the System Works",
        items: [
          { q: "What exactly do you implement?", a: "A CRM and pipeline, lead capture and tracking, instant response and AI-assisted qualification, automated booking, and estimate follow-up sequences — see the Offer section above for the full breakdown." },
          { q: "Do you use GoHighLevel?", a: "Yes, GoHighLevel is part of the infrastructure we build on. You don't need to know or care about the platform — we manage it. Your team interacts with a simple, understandable system." },
          { q: "Can you work with our existing CRM?", a: "In most cases we build the CRM and pipeline as part of the system, since a lot of the value comes from response and follow-up automation living in one place. If you're deeply invested in an existing system, we'll evaluate honestly whether to build around it or replace it." },
          { q: "Does it matter if we do residential, commercial, air-to-air, or air-to-water?", a: "The mechanics of the system are the same. The messaging, qualification questions, and sales cycle we automate are tailored to your specific mix of services." },
        ],
      },
      {
        title: "AI & Automation",
        items: [
          { q: "Will AI replace my staff?", a: "No. AI handles repetitive, time-sensitive tasks like first response and basic qualification. Pricing, negotiating, and closing stay with your team." },
          { q: "Will AI talk to my customers?", a: "For initial response, qualification, and scheduling — yes, and we're transparent with homeowners about it. Every conversation is visible to your team and can be taken over at any time." },
          { q: "What happens if the AI gets something wrong?", a: "Every automated message is reviewable, and workflows are built to hand off to a human whenever a conversation goes outside what AI should handle." },
        ],
      },
      {
        title: "Working Together",
        items: [
          { q: "I already have a CRM / marketing agency — why switch?", a: "You don't have to switch anything to have a conversation. On the assessment, we'll tell you honestly whether your current setup already covers what matters, or where it's leaking." },
          { q: "We tried Google or Facebook ads before and it didn't work.", a: "Ads without a fast, consistent follow-up system behind them usually underperform — the leak is often downstream of the ad, not the ad itself. We look at the whole funnel, not just traffic." },
          { q: "I don't have time to implement this.", a: "That's the point of the system — implementation and day-to-day operation are on us. Your time investment is mainly the onboarding call and ongoing decisions only you can make, like pricing, closing, and service area." },
          { q: "What does my team need to provide?", a: "Access to your current lead sources and calendar, basic information about your services and pricing approach, and a point of contact for onboarding. We handle the build." },
        ],
      },
      {
        title: "Guarantee & Pricing",
        items: [
          { q: "How much does this cost?", a: "It depends on your market, current setup, and which components you need. You'll get a specific number after the assessment call, not a generic published price." },
          { q: "Is there a contract?", a: "Terms are confirmed before you sign anything — ask directly on your assessment call." },
          { q: "What if I don't get results?", a: "See our guarantee section above — we guarantee what's within our control: launch timeline and response time. We won't promise a specific number of jobs, because no honest agency can guarantee homeowner behavior." },
          { q: "I already get enough referrals.", a: "Great — referrals are your highest-margin lead source. This system also applies to referral leads: they still need instant response and consistent follow-up, or they go to whichever installer follows up first." },
        ],
      },
    ],
  },
  finalCta: {
    title: "Your next lead shouldn't become another missed opportunity.",
    description:
      "Let's look at where your current process is leaking installs — and what a lead-to-job system would look like for your business.",
    primaryCta: { label: "Get My Free Growth Assessment", sublabel: "20 minutes · no cost · no obligation" },
    secondaryNote:
      "We'll ask a few questions about your business, review your current lead process, and show you specifically where opportunities are being lost.",
  },
  form: {
    eyebrow: "Free Growth Assessment",
    title: "See where your lead process is leaking",
    description: "Tell us about your business. We'll follow up to schedule your free assessment — no obligation, no spam.",
    nameLabel: "Full name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    companyLabel: "Company name",
    locationLabel: "Service area (city, state)",
    locationPlaceholder: "e.g. Denver, CO",
    segmentLabel: "This is a:",
    segmentResidential: "Residential business",
    segmentCommercial: "Commercial / multi-family business",
    volumeLabel: "Approximate inbound leads per month",
    volumeOptions: ["Under 20", "20–50", "50–100", "100+", "Not sure"],
    challengeLabel: "What's the biggest challenge in your current process?",
    challengePlaceholder: "e.g. We're slow to respond, quotes go cold, no visibility into leads...",
    websiteLabel: "Website (optional)",
    submitLabel: "Get My Free Growth Assessment",
    submittingLabel: "Submitting...",
    privacyNote: "We'll never sell your information.",
    errorRequired: "This field is required.",
    errorEmail: "Enter a valid email address.",
    errorPhone: "Enter a valid phone number.",
    genericError: "Something went wrong. Please try again or email us directly.",
  },
  thankYou: {
    eyebrow: "You're In",
    title: "Your assessment request is in.",
    description: "Here's exactly what happens next.",
    steps: [
      { title: "We review your business", description: "We'll look at your current lead sources, service area, and volume before we talk." },
      { title: "We schedule a 20-minute call", description: "You'll get an email and text shortly to pick a time that works for you." },
      { title: "We show you the leak", description: "You'll leave the call knowing specifically where leads are falling through — whether or not you ever work with us." },
    ],
    calendarPrompt: "Want to lock in a time right now instead of waiting for our email?",
    calendarCtaLabel: "Choose a Time",
    backHref: "/us",
    backLabel: "Back to homepage",
  },
  footer: {
    tagline: "The lead-to-job system for residential heat pump installers.",
    systemLabel: "System",
    systemLinks: [
      { label: "How It Works", href: "#system" },
      { label: "AI & Automation", href: "#ai" },
      { label: "The Offer", href: "#offer" },
      { label: "FAQ", href: "#faq" },
    ],
    marketsLabel: "Markets",
    companyLabel: "Company",
    companyLinks: [{ label: "Get My Free Assessment", href: "#lead-form" }],
    legalLinks: [
      { label: "Privacy Policy", href: "/us/privacy" },
      { label: "Terms of Service", href: "/us/terms" },
    ],
    disclaimer:
      "Megatrix is an independent growth and automation partner for heat pump installers. We are not affiliated with GoHighLevel®, Google, or Meta. Results vary by business and are not guaranteed.",
  },
  sticky: {
    ctaLabel: "Get My Free Assessment",
  },
  legal: {
    privacyTitle: "Privacy Policy",
    privacyBody: [
      "This Privacy Policy explains how Megatrix (\"we\", \"us\") collects and uses information submitted through this website.",
      "We collect information you submit voluntarily through our contact and assessment forms, including your name, email, phone number, company, and details about your business. We use this information solely to respond to your inquiry, schedule your assessment, and share relevant information about our services.",
      "We do not sell your personal information. We may use cookies and analytics tools, such as Google Analytics and the Meta Pixel, to understand how visitors use this site and to measure advertising performance.",
      "You may request access to, correction of, or deletion of your information at any time by contacting us.",
      "This page is a placeholder and has not been reviewed by legal counsel. It should be finalized before this site collects real user data in production, particularly with respect to applicable US state privacy laws.",
    ],
    termsTitle: "Terms of Service",
    termsBody: [
      "These Terms of Service govern your use of this website, operated by Megatrix.",
      "Content on this site is provided for general informational purposes about our services and does not constitute a guarantee of results. Specific commitments — guarantees, pricing, scope of work — are only binding once confirmed in a signed agreement.",
      "By submitting a form on this site, you consent to be contacted by our team regarding your inquiry.",
      "This page is a placeholder and has not been reviewed by legal counsel. It should be finalized before launch.",
    ],
  },
};
