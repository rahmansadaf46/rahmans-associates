import {
  LegalCategory,
  PromptLanguage,
  PromptTone,
  PromptType,
} from "@prisma/client";

type Option<T extends string> = {
  value: T;
  label: string;
  description: string;
};

export const BRAND_NAME = "Rahman’s Associate";
export const BRAND_SHORT_NAME = "Rahman’s";
export const BRAND_TAGLINE = "Premium legal intelligence for Bangladesh counsel";
export const BRAND_HERO_LABEL = "Rahman’s Associate Signature System";

export const DISCLAIMER_TEXT =
  "This tool is for drafting and research assistance only and does not replace professional legal advice.";

export const LEGAL_CATEGORY_LABELS: Record<LegalCategory, string> = {
  [LegalCategory.CRIMINAL_LAW]: "Criminal Law",
  [LegalCategory.CIVIL_LAW]: "Civil Law",
  [LegalCategory.FAMILY_LAW]: "Family Law",
  [LegalCategory.PROPERTY_LAW]: "Property Law",
  [LegalCategory.CORPORATE_COMMERCIAL_LAW]: "Corporate / Commercial Law",
  [LegalCategory.LABOUR_LAW]: "Labour Law",
  [LegalCategory.CONSTITUTIONAL_WRIT]: "Constitutional / Writ",
  [LegalCategory.BANKING_CHEQUE_DISHONOUR]: "Banking / Cheque Dishonour",
  [LegalCategory.CYBER_CRIME]: "Cyber Crime",
  [LegalCategory.LEGAL_NOTICE]: "Legal Notice",
  [LegalCategory.CONTRACT_AGREEMENT]: "Contract / Agreement",
};

export const PROMPT_TYPE_LABELS: Record<PromptType, string> = {
  [PromptType.DRAFTING]: "Drafting",
  [PromptType.LEGAL_RESEARCH]: "Legal Research",
  [PromptType.CASE_SUMMARY]: "Case Summary",
  [PromptType.PETITION]: "Petition",
  [PromptType.WRITTEN_STATEMENT]: "Written Statement",
  [PromptType.BAIL_APPLICATION]: "Bail Application",
  [PromptType.LEGAL_NOTICE]: "Legal Notice",
  [PromptType.AGREEMENT_DRAFT]: "Agreement Draft",
  [PromptType.CLIENT_INTERVIEW_QUESTIONS]: "Client Interview Questions",
};

export const PROMPT_LANGUAGE_LABELS: Record<PromptLanguage, string> = {
  [PromptLanguage.ENGLISH]: "English",
  [PromptLanguage.BANGLA]: "Bangla",
  [PromptLanguage.BILINGUAL]: "Bilingual",
};

export const PROMPT_TONE_LABELS: Record<PromptTone, string> = {
  [PromptTone.FORMAL]: "Formal",
  [PromptTone.DETAILED]: "Detailed",
  [PromptTone.CONCISE]: "Concise",
};

export const LEGAL_CATEGORY_OPTIONS: Option<LegalCategory>[] = [
  {
    value: LegalCategory.CRIMINAL_LAW,
    label: LEGAL_CATEGORY_LABELS[LegalCategory.CRIMINAL_LAW],
    description: "Bail, complaints, defense preparation, and trial-stage drafting.",
  },
  {
    value: LegalCategory.CIVIL_LAW,
    label: LEGAL_CATEGORY_LABELS[LegalCategory.CIVIL_LAW],
    description: "Suits, plaints, written statements, and civil procedure research.",
  },
  {
    value: LegalCategory.FAMILY_LAW,
    label: LEGAL_CATEGORY_LABELS[LegalCategory.FAMILY_LAW],
    description: "Marriage, divorce, maintenance, guardianship, and custody matters.",
  },
  {
    value: LegalCategory.PROPERTY_LAW,
    label: LEGAL_CATEGORY_LABELS[LegalCategory.PROPERTY_LAW],
    description: "Land disputes, partition, title review, deeds, and possession issues.",
  },
  {
    value: LegalCategory.CORPORATE_COMMERCIAL_LAW,
    label: LEGAL_CATEGORY_LABELS[LegalCategory.CORPORATE_COMMERCIAL_LAW],
    description: "Commercial contracts, governance, compliance, and business disputes.",
  },
  {
    value: LegalCategory.LABOUR_LAW,
    label: LEGAL_CATEGORY_LABELS[LegalCategory.LABOUR_LAW],
    description: "Employment discipline, service disputes, and labour court preparation.",
  },
  {
    value: LegalCategory.CONSTITUTIONAL_WRIT,
    label: LEGAL_CATEGORY_LABELS[LegalCategory.CONSTITUTIONAL_WRIT],
    description: "Writ petitions, public law issues, and constitutional remedies.",
  },
  {
    value: LegalCategory.BANKING_CHEQUE_DISHONOUR,
    label: LEGAL_CATEGORY_LABELS[LegalCategory.BANKING_CHEQUE_DISHONOUR],
    description: "Cheque dishonour complaints, recovery strategy, and banking notices.",
  },
  {
    value: LegalCategory.CYBER_CRIME,
    label: LEGAL_CATEGORY_LABELS[LegalCategory.CYBER_CRIME],
    description: "Digital offences, complaints, incident chronology, and cyber compliance.",
  },
  {
    value: LegalCategory.LEGAL_NOTICE,
    label: LEGAL_CATEGORY_LABELS[LegalCategory.LEGAL_NOTICE],
    description: "Demand notices, response notices, and pre-litigation positioning.",
  },
  {
    value: LegalCategory.CONTRACT_AGREEMENT,
    label: LEGAL_CATEGORY_LABELS[LegalCategory.CONTRACT_AGREEMENT],
    description: "Agreements, clauses, review prompts, and negotiation support.",
  },
];

export const PROMPT_TYPE_OPTIONS: Option<PromptType>[] = [
  {
    value: PromptType.DRAFTING,
    label: PROMPT_TYPE_LABELS[PromptType.DRAFTING],
    description: "Generate structured drafting prompts for formal legal documents.",
  },
  {
    value: PromptType.LEGAL_RESEARCH,
    label: PROMPT_TYPE_LABELS[PromptType.LEGAL_RESEARCH],
    description: "Frame a jurisdiction-specific legal research instruction.",
  },
  {
    value: PromptType.CASE_SUMMARY,
    label: PROMPT_TYPE_LABELS[PromptType.CASE_SUMMARY],
    description: "Summarize facts, issues, and procedural posture clearly.",
  },
  {
    value: PromptType.PETITION,
    label: PROMPT_TYPE_LABELS[PromptType.PETITION],
    description: "Create prompt structures for formal petitions and applications.",
  },
  {
    value: PromptType.WRITTEN_STATEMENT,
    label: PROMPT_TYPE_LABELS[PromptType.WRITTEN_STATEMENT],
    description: "Prepare defense-focused prompts for written statements.",
  },
  {
    value: PromptType.BAIL_APPLICATION,
    label: PROMPT_TYPE_LABELS[PromptType.BAIL_APPLICATION],
    description: "Specialized prompts for bail grounds and court-ready structure.",
  },
  {
    value: PromptType.LEGAL_NOTICE,
    label: PROMPT_TYPE_LABELS[PromptType.LEGAL_NOTICE],
    description: "Draft assertive but professional pre-litigation notices.",
  },
  {
    value: PromptType.AGREEMENT_DRAFT,
    label: PROMPT_TYPE_LABELS[PromptType.AGREEMENT_DRAFT],
    description: "Build prompts for complete agreements or clause review.",
  },
  {
    value: PromptType.CLIENT_INTERVIEW_QUESTIONS,
    label: PROMPT_TYPE_LABELS[PromptType.CLIENT_INTERVIEW_QUESTIONS],
    description: "Prepare intake questions to surface missing legal facts.",
  },
];

export const PROMPT_LANGUAGE_OPTIONS: Option<PromptLanguage>[] = [
  {
    value: PromptLanguage.ENGLISH,
    label: PROMPT_LANGUAGE_LABELS[PromptLanguage.ENGLISH],
    description: "Produce the generated prompt fully in English.",
  },
  {
    value: PromptLanguage.BANGLA,
    label: PROMPT_LANGUAGE_LABELS[PromptLanguage.BANGLA],
    description: "Produce the generated prompt fully in Bangla.",
  },
  {
    value: PromptLanguage.BILINGUAL,
    label: PROMPT_LANGUAGE_LABELS[PromptLanguage.BILINGUAL],
    description: "Combine Bangla clarity with English legal terminology where useful.",
  },
];

export const PROMPT_TONE_OPTIONS: Option<PromptTone>[] = [
  {
    value: PromptTone.FORMAL,
    label: PROMPT_TONE_LABELS[PromptTone.FORMAL],
    description: "Courtroom-ready and conventionally professional.",
  },
  {
    value: PromptTone.DETAILED,
    label: PROMPT_TONE_LABELS[PromptTone.DETAILED],
    description: "More explicit sections, detail prompts, and placeholders.",
  },
  {
    value: PromptTone.CONCISE,
    label: PROMPT_TONE_LABELS[PromptTone.CONCISE],
    description: "Compact and efficient while preserving key legal structure.",
  },
];

export const HOME_CATEGORY_HIGHLIGHTS = [
  LegalCategory.CRIMINAL_LAW,
  LegalCategory.CIVIL_LAW,
  LegalCategory.FAMILY_LAW,
  LegalCategory.PROPERTY_LAW,
  LegalCategory.CORPORATE_COMMERCIAL_LAW,
  LegalCategory.LEGAL_NOTICE,
].map((value) => ({
  value,
  label: LEGAL_CATEGORY_LABELS[value],
}));

export const SAMPLE_REQUEST_SUGGESTIONS = [
  "I want a bail application for a criminal case.",
  "আমার একটি লিগ্যাল নোটিশের জন্য স্ট্রাকচার্ড AI prompt দরকার।",
  "Draft a shareholder agreement prompt for a private company in Bangladesh.",
  "Prepare client interview questions for a family maintenance dispute.",
];

export const MAX_INPUT_LENGTHS = {
  userRequest: 1000,
  caseTitle: 160,
  facts: 3500,
  relevantLaw: 600,
  courtName: 160,
  templateSearch: 120,
} as const;
