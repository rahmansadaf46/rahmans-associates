import {
  LegalCategory,
  PromptLanguage,
  PromptTone,
  PromptType,
} from "@prisma/client";

import type { TranslateFn } from "@/lib/i18n";

type Option<T extends string> = {
  value: T;
  label: string;
  description: string;
};

export function getLegalCategoryLabels(
  t: TranslateFn,
): Record<LegalCategory, string> {
  return {
    [LegalCategory.CRIMINAL_LAW]: t("legalCategories.criminalLaw.label"),
    [LegalCategory.CIVIL_LAW]: t("legalCategories.civilLaw.label"),
    [LegalCategory.FAMILY_LAW]: t("legalCategories.familyLaw.label"),
    [LegalCategory.PROPERTY_LAW]: t("legalCategories.propertyLaw.label"),
    [LegalCategory.CORPORATE_COMMERCIAL_LAW]: t(
      "legalCategories.corporateCommercialLaw.label",
    ),
    [LegalCategory.LABOUR_LAW]: t("legalCategories.labourLaw.label"),
    [LegalCategory.CONSTITUTIONAL_WRIT]: t(
      "legalCategories.constitutionalWrit.label",
    ),
    [LegalCategory.BANKING_CHEQUE_DISHONOUR]: t(
      "legalCategories.bankingChequeDishonour.label",
    ),
    [LegalCategory.CYBER_CRIME]: t("legalCategories.cyberCrime.label"),
    [LegalCategory.LEGAL_NOTICE]: t("legalCategories.legalNotice.label"),
    [LegalCategory.CONTRACT_AGREEMENT]: t(
      "legalCategories.contractAgreement.label",
    ),
  };
}

export function getPromptTypeLabels(t: TranslateFn): Record<PromptType, string> {
  return {
    [PromptType.DRAFTING]: t("promptTypes.drafting.label"),
    [PromptType.LEGAL_RESEARCH]: t("promptTypes.legalResearch.label"),
    [PromptType.CASE_SUMMARY]: t("promptTypes.caseSummary.label"),
    [PromptType.PETITION]: t("promptTypes.petition.label"),
    [PromptType.WRITTEN_STATEMENT]: t("promptTypes.writtenStatement.label"),
    [PromptType.BAIL_APPLICATION]: t("promptTypes.bailApplication.label"),
    [PromptType.LEGAL_NOTICE]: t("promptTypes.legalNotice.label"),
    [PromptType.AGREEMENT_DRAFT]: t("promptTypes.agreementDraft.label"),
    [PromptType.CLIENT_INTERVIEW_QUESTIONS]: t(
      "promptTypes.clientInterviewQuestions.label",
    ),
  };
}

export function getPromptLanguageLabels(
  t: TranslateFn,
): Record<PromptLanguage, string> {
  return {
    [PromptLanguage.ENGLISH]: t("promptLanguages.english.label"),
    [PromptLanguage.BANGLA]: t("promptLanguages.bangla.label"),
    [PromptLanguage.BILINGUAL]: t("promptLanguages.bilingual.label"),
  };
}

export function getPromptToneLabels(t: TranslateFn): Record<PromptTone, string> {
  return {
    [PromptTone.FORMAL]: t("promptTones.formal.label"),
    [PromptTone.DETAILED]: t("promptTones.detailed.label"),
    [PromptTone.CONCISE]: t("promptTones.concise.label"),
  };
}

export function getLegalCategoryOptions(
  t: TranslateFn,
): Option<LegalCategory>[] {
  const labels = getLegalCategoryLabels(t);

  return [
    {
      value: LegalCategory.CRIMINAL_LAW,
      label: labels[LegalCategory.CRIMINAL_LAW],
      description: t("legalCategories.criminalLaw.description"),
    },
    {
      value: LegalCategory.CIVIL_LAW,
      label: labels[LegalCategory.CIVIL_LAW],
      description: t("legalCategories.civilLaw.description"),
    },
    {
      value: LegalCategory.FAMILY_LAW,
      label: labels[LegalCategory.FAMILY_LAW],
      description: t("legalCategories.familyLaw.description"),
    },
    {
      value: LegalCategory.PROPERTY_LAW,
      label: labels[LegalCategory.PROPERTY_LAW],
      description: t("legalCategories.propertyLaw.description"),
    },
    {
      value: LegalCategory.CORPORATE_COMMERCIAL_LAW,
      label: labels[LegalCategory.CORPORATE_COMMERCIAL_LAW],
      description: t("legalCategories.corporateCommercialLaw.description"),
    },
    {
      value: LegalCategory.LABOUR_LAW,
      label: labels[LegalCategory.LABOUR_LAW],
      description: t("legalCategories.labourLaw.description"),
    },
    {
      value: LegalCategory.CONSTITUTIONAL_WRIT,
      label: labels[LegalCategory.CONSTITUTIONAL_WRIT],
      description: t("legalCategories.constitutionalWrit.description"),
    },
    {
      value: LegalCategory.BANKING_CHEQUE_DISHONOUR,
      label: labels[LegalCategory.BANKING_CHEQUE_DISHONOUR],
      description: t("legalCategories.bankingChequeDishonour.description"),
    },
    {
      value: LegalCategory.CYBER_CRIME,
      label: labels[LegalCategory.CYBER_CRIME],
      description: t("legalCategories.cyberCrime.description"),
    },
    {
      value: LegalCategory.LEGAL_NOTICE,
      label: labels[LegalCategory.LEGAL_NOTICE],
      description: t("legalCategories.legalNotice.description"),
    },
    {
      value: LegalCategory.CONTRACT_AGREEMENT,
      label: labels[LegalCategory.CONTRACT_AGREEMENT],
      description: t("legalCategories.contractAgreement.description"),
    },
  ];
}

export function getPromptTypeOptions(t: TranslateFn): Option<PromptType>[] {
  const labels = getPromptTypeLabels(t);

  return [
    {
      value: PromptType.DRAFTING,
      label: labels[PromptType.DRAFTING],
      description: t("promptTypes.drafting.description"),
    },
    {
      value: PromptType.LEGAL_RESEARCH,
      label: labels[PromptType.LEGAL_RESEARCH],
      description: t("promptTypes.legalResearch.description"),
    },
    {
      value: PromptType.CASE_SUMMARY,
      label: labels[PromptType.CASE_SUMMARY],
      description: t("promptTypes.caseSummary.description"),
    },
    {
      value: PromptType.PETITION,
      label: labels[PromptType.PETITION],
      description: t("promptTypes.petition.description"),
    },
    {
      value: PromptType.WRITTEN_STATEMENT,
      label: labels[PromptType.WRITTEN_STATEMENT],
      description: t("promptTypes.writtenStatement.description"),
    },
    {
      value: PromptType.BAIL_APPLICATION,
      label: labels[PromptType.BAIL_APPLICATION],
      description: t("promptTypes.bailApplication.description"),
    },
    {
      value: PromptType.LEGAL_NOTICE,
      label: labels[PromptType.LEGAL_NOTICE],
      description: t("promptTypes.legalNotice.description"),
    },
    {
      value: PromptType.AGREEMENT_DRAFT,
      label: labels[PromptType.AGREEMENT_DRAFT],
      description: t("promptTypes.agreementDraft.description"),
    },
    {
      value: PromptType.CLIENT_INTERVIEW_QUESTIONS,
      label: labels[PromptType.CLIENT_INTERVIEW_QUESTIONS],
      description: t("promptTypes.clientInterviewQuestions.description"),
    },
  ];
}

export function getPromptLanguageOptions(
  t: TranslateFn,
): Option<PromptLanguage>[] {
  const labels = getPromptLanguageLabels(t);

  return [
    {
      value: PromptLanguage.ENGLISH,
      label: labels[PromptLanguage.ENGLISH],
      description: t("promptLanguages.english.description"),
    },
    {
      value: PromptLanguage.BANGLA,
      label: labels[PromptLanguage.BANGLA],
      description: t("promptLanguages.bangla.description"),
    },
    {
      value: PromptLanguage.BILINGUAL,
      label: labels[PromptLanguage.BILINGUAL],
      description: t("promptLanguages.bilingual.description"),
    },
  ];
}

export function getPromptToneOptions(t: TranslateFn): Option<PromptTone>[] {
  const labels = getPromptToneLabels(t);

  return [
    {
      value: PromptTone.FORMAL,
      label: labels[PromptTone.FORMAL],
      description: t("promptTones.formal.description"),
    },
    {
      value: PromptTone.DETAILED,
      label: labels[PromptTone.DETAILED],
      description: t("promptTones.detailed.description"),
    },
    {
      value: PromptTone.CONCISE,
      label: labels[PromptTone.CONCISE],
      description: t("promptTones.concise.description"),
    },
  ];
}

export function getHomeCategoryHighlights(t: TranslateFn) {
  const labels = getLegalCategoryLabels(t);

  return [
    LegalCategory.CRIMINAL_LAW,
    LegalCategory.CIVIL_LAW,
    LegalCategory.FAMILY_LAW,
    LegalCategory.PROPERTY_LAW,
    LegalCategory.CORPORATE_COMMERCIAL_LAW,
    LegalCategory.LEGAL_NOTICE,
  ].map((value) => ({
    value,
    label: labels[value],
  }));
}

export function getSampleRequestSuggestions(t: TranslateFn) {
  return [
    t("generator.suggestions.first"),
    t("generator.suggestions.second"),
    t("generator.suggestions.third"),
    t("generator.suggestions.fourth"),
  ];
}
