import {
  LegalCategory,
  PromptLanguage,
  PromptType,
} from "@prisma/client";

export type DefaultPromptTemplate = {
  title: string;
  slug: string;
  description: string;
  category: LegalCategory;
  promptType: PromptType;
  language: PromptLanguage;
  promptBody: string;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
};

export const defaultPromptTemplates: DefaultPromptTemplate[] = [
  {
    title: "Criminal Bail Application Draft",
    slug: "criminal-bail-application-draft",
    description:
      "A structured prompt for preparing a Bangladesh-focused bail application without inventing facts or citations.",
    category: LegalCategory.CRIMINAL_LAW,
    promptType: PromptType.BAIL_APPLICATION,
    language: PromptLanguage.ENGLISH,
    tags: ["bail", "criminal", "court filing", "application"],
    isFeatured: true,
    isPublished: true,
    promptBody:
      "Act as a senior criminal law advocate practicing in Bangladesh. Draft a professional bail application for a criminal matter using only the facts provided. Include case background, allegations, grounds for bail, applicable Bangladeshi legal provisions only if confirmed, prayer, and a formal court-ready structure. Do not invent facts, dates, sections, or citations. If information is missing, list precise placeholders and follow-up questions.",
  },
  {
    title: "Anticipatory Bail Research Prompt",
    slug: "anticipatory-bail-research-prompt",
    description:
      "Research-oriented prompt for anticipatory bail strategy under applicable Bangladeshi law.",
    category: LegalCategory.CRIMINAL_LAW,
    promptType: PromptType.LEGAL_RESEARCH,
    language: PromptLanguage.ENGLISH,
    tags: ["anticipatory bail", "research", "criminal"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh legal research assistant supporting a licensed advocate. Analyze whether anticipatory bail is appropriate on the supplied facts. Identify the legal issues, the procedural stage, the relevant Bangladeshi legal framework to verify, factual gaps, and a checklist of supporting documents. Do not fabricate statutes or precedents; mark uncertain authorities for manual verification.",
  },
  {
    title: "Civil Plaint Drafting Prompt",
    slug: "civil-plaint-drafting-prompt",
    description:
      "Prompt template for converting a plain-language dispute summary into a structured plaint drafting brief.",
    category: LegalCategory.CIVIL_LAW,
    promptType: PromptType.DRAFTING,
    language: PromptLanguage.ENGLISH,
    tags: ["plaint", "civil", "drafting"],
    isFeatured: true,
    isPublished: true,
    promptBody:
      "Act as a senior civil litigator in Bangladesh. Convert the supplied dispute narrative into a structured drafting prompt for a plaint. Include parties, jurisdiction, cause of action, chronology, relief sought, required annexures, and facts that still need confirmation. Maintain formal legal tone and avoid assumptions beyond the provided record.",
  },
  {
    title: "Written Statement for Money Suit",
    slug: "written-statement-money-suit",
    description:
      "Defense-oriented prompt for preparing a written statement in a commercial or money recovery dispute.",
    category: LegalCategory.CIVIL_LAW,
    promptType: PromptType.WRITTEN_STATEMENT,
    language: PromptLanguage.ENGLISH,
    tags: ["written statement", "money suit", "defense"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as counsel for the defendant in a Bangladeshi civil money suit. Draft a prompt that instructs an AI system to prepare a written statement using only provided facts. Require paragraph-wise response strategy, preliminary objections, factual denials, legal defenses, documentary needs, and a prayer section. Do not admit facts that are not expressly confirmed.",
  },
  {
    title: "Mutual Divorce Petition Prompt",
    slug: "mutual-divorce-petition-prompt",
    description:
      "A family-law prompt for organizing facts and placeholders for a mutual divorce or dissolution matter.",
    category: LegalCategory.FAMILY_LAW,
    promptType: PromptType.PETITION,
    language: PromptLanguage.ENGLISH,
    tags: ["family", "divorce", "petition"],
    isFeatured: true,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh family law drafting assistant working under advocate supervision. Prepare a structured prompt for a divorce-related petition. Include marriage details, parties, children, financial arrangements, statutory considerations to verify, supporting documents, and missing facts. Keep the output respectful, neutral, and professionally formatted.",
  },
  {
    title: "Child Custody Case Preparation Prompt",
    slug: "child-custody-case-preparation-prompt",
    description:
      "Prompt template for gathering facts and issues before drafting in a custody matter.",
    category: LegalCategory.FAMILY_LAW,
    promptType: PromptType.CLIENT_INTERVIEW_QUESTIONS,
    language: PromptLanguage.ENGLISH,
    tags: ["custody", "client interview", "family"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as a senior Bangladesh family law practitioner. Generate a client interview and case preparation prompt for a custody dispute. Ask targeted questions about the child’s welfare, current residence, schooling, caregiving history, allegations, interim relief needs, and documentary support. Avoid conclusions and leave disputed facts clearly marked.",
  },
  {
    title: "Land Partition Dispute Research Prompt",
    slug: "land-partition-dispute-research-prompt",
    description:
      "Useful for property disputes involving co-sharers, possession, and title verification.",
    category: LegalCategory.PROPERTY_LAW,
    promptType: PromptType.LEGAL_RESEARCH,
    language: PromptLanguage.ENGLISH,
    tags: ["land", "partition", "property", "research"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh property law research assistant. Analyze a land partition dispute by organizing the factual matrix, chain of title issues, possession questions, mutation or survey concerns, legal remedies to verify, and evidence requirements. Do not invent land records, statutes, or case law; flag uncertain legal points for advocate review.",
  },
  {
    title: "Property Mutation Objection Notice",
    slug: "property-mutation-objection-notice",
    description:
      "Structured legal notice prompt for property mutation objections and title concerns.",
    category: LegalCategory.PROPERTY_LAW,
    promptType: PromptType.LEGAL_NOTICE,
    language: PromptLanguage.ENGLISH,
    tags: ["mutation", "notice", "property"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh property advocate. Draft a prompt for a formal legal notice objecting to mutation or record changes affecting the client’s rights. Require factual background, title basis, specific objection points, warning against unauthorized dealings, requested corrective action, and placeholders for documentary references.",
  },
  {
    title: "Commercial Agreement Review Prompt",
    slug: "commercial-agreement-review-prompt",
    description:
      "A reusable prompt for reviewing business contracts under Bangladesh commercial context.",
    category: LegalCategory.CORPORATE_COMMERCIAL_LAW,
    promptType: PromptType.LEGAL_RESEARCH,
    language: PromptLanguage.ENGLISH,
    tags: ["commercial", "agreement review", "corporate"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh corporate counsel reviewing a commercial agreement. Generate a prompt that asks an AI system to assess commercial risks, ambiguous clauses, payment terms, liability allocation, dispute resolution, compliance concerns, and missing schedules. Require the AI to avoid claiming enforceability unless the text supports it and to flag clauses for human review.",
  },
  {
    title: "Shareholder Agreement Draft Prompt",
    slug: "shareholder-agreement-draft-prompt",
    description:
      "Prompt for preparing an initial shareholder agreement drafting brief for a private company.",
    category: LegalCategory.CORPORATE_COMMERCIAL_LAW,
    promptType: PromptType.AGREEMENT_DRAFT,
    language: PromptLanguage.ENGLISH,
    tags: ["shareholder agreement", "company", "drafting"],
    isFeatured: true,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh corporate transactions lawyer. Draft a professional AI prompt for a shareholder agreement. Require sections on parties, shareholding, governance, reserved matters, transfer restrictions, deadlock handling, confidentiality, dispute resolution, and execution mechanics. Use placeholders where incorporation or commercial facts are incomplete.",
  },
  {
    title: "Employment Show Cause Reply Prompt",
    slug: "employment-show-cause-reply-prompt",
    description:
      "Labour-law drafting prompt for employee-side or employer-side response preparation.",
    category: LegalCategory.LABOUR_LAW,
    promptType: PromptType.DRAFTING,
    language: PromptLanguage.ENGLISH,
    tags: ["labour", "show cause", "employment"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh labour law practitioner. Create a prompt for drafting a reply to a show cause notice. Include employment background, allegations, factual response, procedural fairness issues, applicable labour framework to verify, documentary evidence, and the precise relief or clarification sought. Keep the tone measured and professional.",
  },
  {
    title: "Labour Court Petition Prompt",
    slug: "labour-court-petition-prompt",
    description:
      "Prompt template for petitions involving wrongful termination or service benefits.",
    category: LegalCategory.LABOUR_LAW,
    promptType: PromptType.PETITION,
    language: PromptLanguage.ENGLISH,
    tags: ["labour court", "petition", "termination"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as an advocate preparing a Bangladesh labour court petition. Structure the AI prompt to include employment timeline, cause of action, internal grievance history, statutory entitlements to verify, calculation placeholders for dues, annexure list, and court-ready prayer. Do not assume salary figures or service records that are not supplied.",
  },
  {
    title: "Writ Petition Strategy Prompt",
    slug: "writ-petition-strategy-prompt",
    description:
      "Constitutional prompt focused on rights, maintainability, and relief framing.",
    category: LegalCategory.CONSTITUTIONAL_WRIT,
    promptType: PromptType.PETITION,
    language: PromptLanguage.ENGLISH,
    tags: ["writ", "constitutional", "petition"],
    isFeatured: true,
    isPublished: true,
    promptBody:
      "Act as a senior advocate handling writ matters in Bangladesh. Convert the user’s issue into a structured writ petition drafting prompt. Require a statement of facts, public authority involvement, maintainability questions, constitutional or statutory rights implicated, interim relief, final relief, urgency factors, and documentary annexures. Warn the AI not to invent legal grounds or case citations.",
  },
  {
    title: "Cheque Dishonour Complaint Prompt",
    slug: "cheque-dishonour-complaint-prompt",
    description:
      "Prompt template for cheque dishonour complaints and supporting chronology.",
    category: LegalCategory.BANKING_CHEQUE_DISHONOUR,
    promptType: PromptType.DRAFTING,
    language: PromptLanguage.ENGLISH,
    tags: ["cheque dishonour", "banking", "complaint"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh litigation advocate. Draft a prompt for preparing a cheque dishonour complaint or related proceedings using only verified facts. Include drawer and payee details, cheque particulars, presentation and dishonour chronology, notice requirements to verify, documentary list, limitation concerns, and prayer. Flag every legal provision for manual confirmation.",
  },
  {
    title: "Bank Recovery Legal Notice Prompt",
    slug: "bank-recovery-legal-notice-prompt",
    description:
      "A structured recovery notice prompt for banking and commercial payment defaults.",
    category: LegalCategory.BANKING_CHEQUE_DISHONOUR,
    promptType: PromptType.LEGAL_NOTICE,
    language: PromptLanguage.ENGLISH,
    tags: ["bank recovery", "legal notice", "default"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as Bangladesh counsel issuing a recovery notice. Draft a prompt that produces a formal demand notice covering facility background, outstanding obligation, default chronology, demand for payment, consequences of non-compliance, and placeholders for account statements or contractual references. The AI must not calculate amounts unless figures are explicitly provided.",
  },
  {
    title: "Cyber Complaint Preparation Prompt",
    slug: "cyber-complaint-preparation-prompt",
    description:
      "Helps organize facts and evidence for cyber incident complaints in Bangladesh.",
    category: LegalCategory.CYBER_CRIME,
    promptType: PromptType.DRAFTING,
    language: PromptLanguage.ENGLISH,
    tags: ["cyber crime", "complaint", "digital evidence"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh cyber law practitioner. Generate a structured prompt for drafting a cyber incident complaint. Require incident chronology, online accounts or platforms involved, screenshots and metadata, loss or harm suffered, preservation steps, applicable law to verify, and urgent relief needs. Never fabricate digital evidence, police references, or statute numbers.",
  },
  {
    title: "Online Harassment Case Summary Prompt",
    slug: "online-harassment-case-summary-prompt",
    description:
      "Case summary prompt for online abuse, impersonation, or harassment matters.",
    category: LegalCategory.CYBER_CRIME,
    promptType: PromptType.CASE_SUMMARY,
    language: PromptLanguage.ENGLISH,
    tags: ["harassment", "case summary", "cyber"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh legal case analyst. Summarize an online harassment matter for advocate review. Structure the output around factual timeline, digital evidence inventory, suspected offences to verify, urgency, safety considerations, and missing information. Keep the summary factual and avoid unsupported conclusions.",
  },
  {
    title: "Contract Breach Legal Notice Prompt",
    slug: "contract-breach-legal-notice-prompt",
    description:
      "Pre-litigation notice prompt for payment default or contractual non-performance.",
    category: LegalCategory.LEGAL_NOTICE,
    promptType: PromptType.LEGAL_NOTICE,
    language: PromptLanguage.ENGLISH,
    tags: ["breach", "contract", "notice"],
    isFeatured: true,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh advocate issuing a legal notice for breach of contract. Draft a prompt that requires contract background, obligations breached, chronology, monetary claim or remedial demand, cure period, documentary support, and reservation of legal rights. Use a firm professional tone and leave placeholders for missing dates, clause references, and addresses.",
  },
  {
    title: "Reply to Legal Notice Prompt",
    slug: "reply-to-legal-notice-prompt",
    description:
      "Response-side prompt for carefully rebutting or qualifying allegations in a received notice.",
    category: LegalCategory.LEGAL_NOTICE,
    promptType: PromptType.DRAFTING,
    language: PromptLanguage.ENGLISH,
    tags: ["notice reply", "response", "defense"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh litigation lawyer preparing a reply to a legal notice. Generate a prompt that requires identification of the allegations, admissions and denials, factual clarifications, contractual or legal context to verify, document references, and closing reservation of rights. Avoid hostile language and do not concede unverified claims.",
  },
  {
    title: "Service Agreement Draft Prompt",
    slug: "service-agreement-draft-prompt",
    description:
      "A reusable agreement drafting prompt for consultancy, agency, or services arrangements.",
    category: LegalCategory.CONTRACT_AGREEMENT,
    promptType: PromptType.AGREEMENT_DRAFT,
    language: PromptLanguage.ENGLISH,
    tags: ["service agreement", "contract", "drafting"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as a Bangladesh contract drafting specialist. Create a prompt for preparing a service agreement. Require sections on scope of services, fees, payment schedule, term, confidentiality, intellectual property, representations, termination, dispute resolution, governing law placeholders, and execution details. If commercial terms are missing, ask concise follow-up questions.",
  },
  {
    title: "Employment Contract Draft Prompt",
    slug: "employment-contract-draft-prompt",
    description:
      "Prompt template for structured employment agreements under Bangladesh context.",
    category: LegalCategory.CONTRACT_AGREEMENT,
    promptType: PromptType.AGREEMENT_DRAFT,
    language: PromptLanguage.ENGLISH,
    tags: ["employment", "agreement", "hr"],
    isFeatured: false,
    isPublished: true,
    promptBody:
      "Act as Bangladesh employment counsel. Draft a prompt for an employment contract that covers designation, reporting line, compensation, probation, benefits, leave, confidentiality, misconduct, termination, dispute handling, and mandatory placeholders for employer policy references. The AI must not imply statutory compliance unless it is separately verified.",
  },
];
