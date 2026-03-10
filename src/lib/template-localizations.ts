import type { Locale } from "@/lib/i18n";
import type { TemplateRecord } from "@/server/services/template-service";

type LocalizedTemplateText = Pick<TemplateRecord, "description" | "title">;

const bnTemplateText: Record<string, LocalizedTemplateText> = {
  "criminal-bail-application-draft": {
    title: "ক্রিমিনাল জামিন আবেদন ড্রাফট",
    description:
      "তথ্য বা citation উদ্ভাবন না করে বাংলাদেশ-কেন্দ্রিক জামিন আবেদন প্রস্তুতের জন্য একটি স্ট্রাকচার্ড prompt।",
  },
  "anticipatory-bail-research-prompt": {
    title: "অ্যান্টিসিপেটরি বেল রিসার্চ প্রম্পট",
    description:
      "প্রযোজ্য বাংলাদেশি আইনের আলোকে anticipatory bail কৌশল বিশ্লেষণের জন্য গবেষণাভিত্তিক prompt।",
  },
  "civil-plaint-drafting-prompt": {
    title: "সিভিল প্লেইন্ট ড্রাফটিং প্রম্পট",
    description:
      "সাধারণ ভাষার dispute summary-কে স্ট্রাকচার্ড plaint drafting brief-এ রূপ দেওয়ার জন্য prompt template।",
  },
  "written-statement-money-suit": {
    title: "মানি স্যুটের জন্য রিটেন স্টেটমেন্ট",
    description:
      "বাণিজ্যিক বা অর্থ আদায়-সংক্রান্ত বিরোধে written statement প্রস্তুতের জন্য defense-focused prompt।",
  },
  "mutual-divorce-petition-prompt": {
    title: "মিউচুয়াল ডিভোর্স পিটিশন প্রম্পট",
    description:
      "মিউচুয়াল divorce বা dissolution matter-এর তথ্য ও placeholder গুছিয়ে নেওয়ার জন্য family-law prompt।",
  },
  "child-custody-case-preparation-prompt": {
    title: "চাইল্ড কাস্টডি কেস প্রিপারেশন প্রম্পট",
    description:
      "কাস্টডি matter-এ drafting-এর আগে facts ও issues সংগ্রহের জন্য prompt template।",
  },
  "land-partition-dispute-research-prompt": {
    title: "ল্যান্ড পার্টিশন ডিসপিউট রিসার্চ প্রম্পট",
    description:
      "সহ-মালিকানা, possession ও title verification-সংক্রান্ত property dispute বিশ্লেষণে কার্যকর।",
  },
  "property-mutation-objection-notice": {
    title: "প্রপার্টি মিউটেশন অবজেকশন নোটিশ",
    description:
      "মিউটেশন আপত্তি ও title concern-এর জন্য স্ট্রাকচার্ড legal notice prompt।",
  },
  "commercial-agreement-review-prompt": {
    title: "কমার্শিয়াল এগ্রিমেন্ট রিভিউ প্রম্পট",
    description:
      "বাংলাদেশি commercial context-এ business contract review-এর জন্য পুনর্ব্যবহারযোগ্য prompt।",
  },
  "shareholder-agreement-draft-prompt": {
    title: "শেয়ারহোল্ডার এগ্রিমেন্ট ড্রাফট প্রম্পট",
    description:
      "একটি private company-র জন্য initial shareholder agreement drafting brief প্রস্তুতের prompt।",
  },
  "employment-show-cause-reply-prompt": {
    title: "এমপ্লয়মেন্ট শো-কজ রিপ্লাই প্রম্পট",
    description:
      "কর্মচারী বা নিয়োগকর্তা-পক্ষের response preparation-এর জন্য labour-law drafting prompt।",
  },
  "labour-court-petition-prompt": {
    title: "লেবার কোর্ট পিটিশন প্রম্পট",
    description:
      "অন্যায় termination বা service benefit-সংক্রান্ত petition-এর জন্য prompt template।",
  },
  "writ-petition-strategy-prompt": {
    title: "রিট পিটিশন স্ট্র্যাটেজি প্রম্পট",
    description:
      "অধিকার, maintainability ও relief framing-কেন্দ্রিক constitutional prompt।",
  },
  "cheque-dishonour-complaint-prompt": {
    title: "চেক ডিসঅনার কমপ্লেইন্ট প্রম্পট",
    description:
      "চেক ডিসঅনার complaint ও supporting chronology প্রস্তুতের জন্য prompt template।",
  },
  "bank-recovery-legal-notice-prompt": {
    title: "ব্যাংক রিকভারি লিগ্যাল নোটিশ প্রম্পট",
    description:
      "ব্যাংকিং ও commercial payment default-এর জন্য স্ট্রাকচার্ড recovery notice prompt।",
  },
  "cyber-complaint-preparation-prompt": {
    title: "সাইবার কমপ্লেইন্ট প্রিপারেশন প্রম্পট",
    description:
      "বাংলাদেশে cyber incident complaint-এর facts ও evidence গুছিয়ে নিতে সহায়তা করে।",
  },
  "online-harassment-case-summary-prompt": {
    title: "অনলাইন হয়রানি কেস সামারি প্রম্পট",
    description:
      "অনলাইন abuse, impersonation বা harassment matter-এর জন্য case summary prompt।",
  },
  "contract-breach-legal-notice-prompt": {
    title: "কনট্র্যাক্ট ব্রিচ লিগ্যাল নোটিশ প্রম্পট",
    description:
      "পেমেন্ট ডিফল্ট বা contractual non-performance-এর জন্য pre-litigation notice prompt।",
  },
  "reply-to-legal-notice-prompt": {
    title: "লিগ্যাল নোটিশের জবাব প্রম্পট",
    description:
      "প্রাপ্ত notice-এর allegation সতর্কভাবে rebut বা qualify করার জন্য response-side prompt।",
  },
  "service-agreement-draft-prompt": {
    title: "সার্ভিস এগ্রিমেন্ট ড্রাফট প্রম্পট",
    description:
      "consultancy, agency বা services arrangement-এর জন্য পুনর্ব্যবহারযোগ্য agreement drafting prompt।",
  },
  "employment-contract-draft-prompt": {
    title: "এমপ্লয়মেন্ট কনট্র্যাক্ট ড্রাফট প্রম্পট",
    description:
      "বাংলাদেশি context-এ স্ট্রাকচার্ড employment agreement প্রস্তুতের জন্য prompt template।",
  },
};

export function localizeTemplateRecord<
  T extends Pick<TemplateRecord, "description" | "slug" | "title">,
>(template: T, locale: Locale): T {
  if (locale !== "bn") {
    return template;
  }

  const localized = bnTemplateText[template.slug];

  if (!localized) {
    return template;
  }

  return {
    ...template,
    ...localized,
  };
}

export function localizeTemplateRecords<
  T extends Pick<TemplateRecord, "description" | "slug" | "title">,
>(templates: T[], locale: Locale) {
  return templates.map((template) => localizeTemplateRecord(template, locale));
}
