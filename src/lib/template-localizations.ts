import type { Locale } from "@/lib/i18n";
import type { TemplateRecord } from "@/server/services/template-service";

type LocalizedTemplateText = Pick<TemplateRecord, "description" | "title">;

const bnTemplateText: Record<string, LocalizedTemplateText> = {
  "criminal-bail-application-draft": {
    title: "ক্রিমিনাল জামিন আবেদন ড্রাফট",
    description:
      "তথ্য বা উদ্ধৃতি উদ্ভাবন না করে বাংলাদেশকেন্দ্রিক জামিন আবেদন প্রস্তুতের জন্য গুছানো সহায়তা।",
  },
  "anticipatory-bail-research-prompt": {
    title: "অ্যান্টিসিপেটরি বেল রিসার্চ গাইড",
    description:
      "প্রযোজ্য বাংলাদেশি আইনের আলোকে অ্যান্টিসিপেটরি বেলের কৌশল বিশ্লেষণের জন্য গবেষণাভিত্তিক সহায়তা।",
  },
  "civil-plaint-drafting-prompt": {
    title: "সিভিল প্লেইন্ট ড্রাফটিং গাইড",
    description:
      "সাধারণ ভাষায় বলা বিরোধের বিবরণকে গুছানো প্লেইন্ট প্রস্তুতির সহায়তায় রূপ দেওয়ার জন্য তৈরি।",
  },
  "written-statement-money-suit": {
    title: "মানি স্যুটের জন্য রিটেন স্টেটমেন্ট",
    description:
      "বাণিজ্যিক বা অর্থ আদায়-সংক্রান্ত বিরোধে written statement প্রস্তুতের জন্য প্রতিরক্ষামূলক সহায়তা।",
  },
  "mutual-divorce-petition-prompt": {
    title: "মিউচুয়াল ডিভোর্স পিটিশন গাইড",
    description:
      "পারস্পরিক তালাক বা বিবাহবিচ্ছেদসংক্রান্ত বিষয়ের তথ্য গুছিয়ে নেওয়ার জন্য পারিবারিক আইনি সহায়তা।",
  },
  "child-custody-case-preparation-prompt": {
    title: "চাইল্ড কাস্টডি কেস প্রিপারেশন গাইড",
    description:
      "শিশুর হেফাজতসংক্রান্ত বিষয়ে খসড়া তৈরির আগে প্রয়োজনীয় তথ্য ও প্রশ্ন গুছিয়ে নিতে সহায়তা করে।",
  },
  "land-partition-dispute-research-prompt": {
    title: "ল্যান্ড পার্টিশন ডিসপিউট রিসার্চ গাইড",
    description:
      "সহ-মালিকানা, দখল এবং মালিকানা যাচাইসংক্রান্ত সম্পত্তি বিরোধ বিশ্লেষণে কার্যকর।",
  },
  "property-mutation-objection-notice": {
    title: "প্রপার্টি মিউটেশন অবজেকশন নোটিশ",
    description:
      "মিউটেশন আপত্তি ও মালিকানা-সংক্রান্ত উদ্বেগের জন্য গুছানো আইনি নোটিশ সহায়তা।",
  },
  "commercial-agreement-review-prompt": {
    title: "কমার্শিয়াল এগ্রিমেন্ট রিভিউ গাইড",
    description:
      "বাংলাদেশি ব্যবসায়িক প্রেক্ষাপটে চুক্তি পর্যালোচনার জন্য পুনর্ব্যবহারযোগ্য সহায়তা।",
  },
  "shareholder-agreement-draft-prompt": {
    title: "শেয়ারহোল্ডার এগ্রিমেন্ট ড্রাফট গাইড",
    description:
      "একটি প্রাইভেট কোম্পানির জন্য প্রাথমিক শেয়ারহোল্ডার এগ্রিমেন্ট গুছিয়ে নিতে সহায়তা করে।",
  },
  "employment-show-cause-reply-prompt": {
    title: "এমপ্লয়মেন্ট শো-কজ রিপ্লাই গাইড",
    description:
      "কর্মচারী বা নিয়োগকর্তা-পক্ষের শোকজের জবাব প্রস্তুতে শ্রম আইনভিত্তিক সহায়তা।",
  },
  "labour-court-petition-prompt": {
    title: "লেবার কোর্ট পিটিশন গাইড",
    description:
      "অন্যায় চাকরিচ্যুতি বা চাকরিসংক্রান্ত সুবিধার দাবিতে পিটিশন প্রস্তুতে সহায়তা।",
  },
  "writ-petition-strategy-prompt": {
    title: "রিট পিটিশন স্ট্র্যাটেজি গাইড",
    description:
      "অধিকার, গ্রহণযোগ্যতা এবং চাওয়া প্রতিকার গুছিয়ে নিতে রিটসংক্রান্ত সহায়তা।",
  },
  "cheque-dishonour-complaint-prompt": {
    title: "চেক ডিসঅনার কমপ্লেইন্ট গাইড",
    description:
      "চেক ডিসঅনারের অভিযোগ ও সহায়ক ঘটনাক্রম গুছিয়ে প্রস্তুতের জন্য সহায়তা।",
  },
  "bank-recovery-legal-notice-prompt": {
    title: "ব্যাংক রিকভারি আইনি নোটিশ গাইড",
    description:
      "ব্যাংকিং ও বাণিজ্যিক বকেয়া আদায়ের জন্য গুছানো নোটিশ প্রস্তুতে সহায়তা।",
  },
  "cyber-complaint-preparation-prompt": {
    title: "সাইবার কমপ্লেইন্ট প্রিপারেশন গাইড",
    description:
      "বাংলাদেশে সাইবার ঘটনার অভিযোগের তথ্য ও প্রমাণ গুছিয়ে নিতে সহায়তা করে।",
  },
  "online-harassment-case-summary-prompt": {
    title: "অনলাইন হয়রানি কেস সামারি গাইড",
    description:
      "অনলাইন হয়রানি, ভুয়া পরিচয় ব্যবহার, বা অপব্যবহারের ঘটনায় সারসংক্ষেপ প্রস্তুতে সহায়তা।",
  },
  "contract-breach-legal-notice-prompt": {
    title: "কনট্র্যাক্ট ব্রিচ আইনি নোটিশ গাইড",
    description:
      "পেমেন্ট ডিফল্ট বা চুক্তি ভঙ্গের ক্ষেত্রে মামলা-পূর্ব নোটিশ প্রস্তুতে সহায়তা।",
  },
  "reply-to-legal-notice-prompt": {
    title: "আইনি নোটিশের জবাব গাইড",
    description:
      "প্রাপ্ত নোটিশের অভিযোগের জবাব সতর্কভাবে গুছিয়ে দিতে সহায়তা করে।",
  },
  "service-agreement-draft-prompt": {
    title: "সার্ভিস এগ্রিমেন্ট ড্রাফট গাইড",
    description:
      "কনসালটেন্সি, এজেন্সি বা সেবা প্রদানের চুক্তি গুছিয়ে প্রস্তুতের জন্য সহায়তা।",
  },
  "employment-contract-draft-prompt": {
    title: "এমপ্লয়মেন্ট কনট্র্যাক্ট ড্রাফট গাইড",
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
