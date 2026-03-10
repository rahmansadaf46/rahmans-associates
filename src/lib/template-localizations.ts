import type { Locale } from "@/lib/i18n";
import type { TemplateRecord } from "@/server/services/template-service";

type LocalizedTemplateText = Pick<TemplateRecord, "description" | "title">;

const bnTemplateText: Record<string, LocalizedTemplateText> = {
  "criminal-bail-application-draft": {
    title: "ফৌজদারি মামলার জামিন আবেদন",
    description:
      "তথ্য বা উদ্ধৃতি উদ্ভাবন না করে বাংলাদেশকেন্দ্রিক জামিন আবেদন প্রস্তুতের জন্য গুছানো সহায়তা।",
  },
  "anticipatory-bail-research-prompt": {
    title: "অ্যান্টিসিপেটরি বেল গবেষণা নির্দেশিকা",
    description:
      "প্রযোজ্য বাংলাদেশি আইনের আলোকে অ্যান্টিসিপেটরি বেলের কৌশল বিশ্লেষণের জন্য গবেষণাভিত্তিক সহায়তা।",
  },
  "civil-plaint-drafting-prompt": {
    title: "সিভিল প্লেইন্ট ড্রাফটিং নির্দেশিকা",
    description:
      "সাধারণ ভাষায় বর্ণিত বিরোধের বিবরণকে গুছানো প্লেইন্ট প্রস্তুতির সহায়তায় রূপ দেওয়ার জন্য তৈরি।",
  },
  "written-statement-money-suit": {
    title: "মানি স্যুটের লিখিত জবাব",
    description:
      "বাণিজ্যিক বা অর্থ আদায়-সংক্রান্ত বিরোধে লিখিত জবাব প্রস্তুতের জন্য প্রতিরক্ষামূলক সহায়তা।",
  },
  "mutual-divorce-petition-prompt": {
    title: "মিউচুয়াল ডিভোর্স পিটিশন নির্দেশিকা",
    description:
      "পারস্পরিক তালাক বা বিবাহবিচ্ছেদসংক্রান্ত বিষয়ের তথ্য গুছিয়ে নেওয়ার জন্য পারিবারিক আইনি সহায়তা।",
  },
  "child-custody-case-preparation-prompt": {
    title: "শিশুর হেফাজত মামলার প্রস্তুতি নির্দেশিকা",
    description:
      "শিশুর হেফাজতসংক্রান্ত বিষয়ে খসড়া তৈরির আগে প্রয়োজনীয় তথ্য ও প্রশ্ন গুছিয়ে নিতে সহায়তা করে।",
  },
  "land-partition-dispute-research-prompt": {
    title: "জমি ভাগবাটোয়ারা বিরোধ গবেষণা নির্দেশিকা",
    description:
      "সহ-মালিকানা, দখল এবং মালিকানা যাচাইসংক্রান্ত সম্পত্তি বিরোধ বিশ্লেষণে কার্যকর।",
  },
  "property-mutation-objection-notice": {
    title: "মিউটেশন আপত্তি নোটিশ",
    description:
      "মিউটেশন আপত্তি ও মালিকানা-সংক্রান্ত উদ্বেগের জন্য গুছানো আইনি নোটিশ সহায়তা।",
  },
  "commercial-agreement-review-prompt": {
    title: "বাণিজ্যিক এগ্রিমেন্ট রিভিউ নির্দেশিকা",
    description:
      "বাংলাদেশি ব্যবসায়িক প্রেক্ষাপটে চুক্তি পর্যালোচনার জন্য পুনর্ব্যবহারযোগ্য সহায়তা।",
  },
  "shareholder-agreement-draft-prompt": {
    title: "শেয়ারহোল্ডার এগ্রিমেন্ট ড্রাফট নির্দেশিকা",
    description:
      "একটি প্রাইভেট কোম্পানির জন্য প্রাথমিক শেয়ারহোল্ডার এগ্রিমেন্ট গুছিয়ে নিতে সহায়তা করে।",
  },
  "employment-show-cause-reply-prompt": {
    title: "শোকজের জবাব নির্দেশিকা",
    description:
      "কর্মচারী বা নিয়োগকর্তা-পক্ষের শোকজের জবাব প্রস্তুতে শ্রম আইনভিত্তিক সহায়তা।",
  },
  "labour-court-petition-prompt": {
    title: "শ্রম আদালত পিটিশন নির্দেশিকা",
    description:
      "অন্যায় চাকরিচ্যুতি বা চাকরিসংক্রান্ত সুবিধার দাবিতে পিটিশন প্রস্তুতে সহায়তা।",
  },
  "writ-petition-strategy-prompt": {
    title: "রিট পিটিশন কৌশল নির্দেশিকা",
    description:
      "অধিকার, গ্রহণযোগ্যতা এবং চাওয়া প্রতিকার গুছিয়ে নিতে রিটসংক্রান্ত সহায়তা।",
  },
  "cheque-dishonour-complaint-prompt": {
    title: "চেক ডিসঅনার অভিযোগ নির্দেশিকা",
    description:
      "চেক ডিসঅনারের অভিযোগ ও সহায়ক ঘটনাক্রম গুছিয়ে প্রস্তুতের জন্য সহায়তা।",
  },
  "bank-recovery-legal-notice-prompt": {
    title: "ব্যাংক রিকভারি আইনি নোটিশ",
    description:
      "ব্যাংকিং ও বাণিজ্যিক বকেয়া আদায়ের জন্য গুছানো নোটিশ প্রস্তুতে সহায়তা।",
  },
  "cyber-complaint-preparation-prompt": {
    title: "সাইবার অভিযোগ প্রস্তুতি নির্দেশিকা",
    description:
      "বাংলাদেশে সাইবার ঘটনার অভিযোগের তথ্য ও প্রমাণ গুছিয়ে নিতে সহায়তা করে।",
  },
  "online-harassment-case-summary-prompt": {
    title: "অনলাইন হয়রানি কেস সামারি নির্দেশিকা",
    description:
      "অনলাইন হয়রানি, ভুয়া পরিচয় ব্যবহার বা অপব্যবহারের ঘটনায় সারসংক্ষেপ প্রস্তুতে সহায়তা।",
  },
  "contract-breach-legal-notice-prompt": {
    title: "চুক্তিভঙ্গের আইনি নোটিশ",
    description:
      "পেমেন্ট ডিফল্ট বা চুক্তিভঙ্গের ক্ষেত্রে মামলা-পূর্ব নোটিশ প্রস্তুতে সহায়তা।",
  },
  "reply-to-legal-notice-prompt": {
    title: "আইনি নোটিশের জবাব নির্দেশিকা",
    description:
      "প্রাপ্ত নোটিশের অভিযোগের জবাব সতর্কভাবে গুছিয়ে দিতে সহায়তা করে।",
  },
  "service-agreement-draft-prompt": {
    title: "সার্ভিস এগ্রিমেন্ট ড্রাফট নির্দেশিকা",
    description:
      "কনসালটেন্সি, এজেন্সি বা সেবা প্রদানের চুক্তি গুছিয়ে প্রস্তুতের জন্য সহায়তা।",
  },
  "employment-contract-draft-prompt": {
    title: "চাকরির চুক্তি ড্রাফট নির্দেশিকা",
    description:
      "বাংলাদেশি প্রেক্ষাপটে গুছানো চাকরির চুক্তি প্রস্তুতের জন্য সহায়তা।",
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
