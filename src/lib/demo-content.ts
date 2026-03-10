import type { Locale } from "@/lib/i18n";

type DemoPrompt = {
  excerpt: string;
  title: string;
};

const demoPrompts: Record<Locale, DemoPrompt[]> = {
  en: [
    {
      title: "Bail Application",
      excerpt:
        "Act as a senior advocate practicing in Bangladesh. Draft a professional bail application for a criminal matter under applicable Bangladeshi law. Include case background, grounds for bail, relevant legal provisions to be verified, prayer, and a formal court-ready structure. Do not invent facts or citations. Ask for missing details or insert clearly marked placeholders.",
    },
    {
      title: "Property Notice",
      excerpt:
        "Act as a Bangladesh property lawyer. Prepare a formal legal notice regarding a land partition and possession dispute. Include title background, disputed acts, documentary references, relief demanded, time for compliance, and a warning against unauthorized transfer. Where facts are incomplete, preserve placeholders instead of assumptions.",
    },
    {
      title: "Employment Agreement",
      excerpt:
        "Act as corporate counsel in Bangladesh. Draft a structured AI prompt for preparing an employment agreement. Require sections on appointment terms, duties, compensation, leave, confidentiality, misconduct, termination, governing law placeholders, and execution formalities. Keep the tone formal and avoid claiming statutory compliance without verification.",
    },
  ],
  bn: [
    {
      title: "জামিন আবেদন",
      excerpt:
        "বাংলাদেশে প্র্যাকটিসরত একজন জ্যেষ্ঠ আইনজীবীর ভূমিকায় কাজ করুন। প্রযোজ্য বাংলাদেশি আইনের আলোকে একটি ক্রিমিনাল matter-এর জন্য পেশাদার জামিন আবেদন প্রস্তুত করুন। এতে case background, bail-এর ground, যাচাইযোগ্য আইনি বিধান, prayer এবং আদালত-উপযোগী formal structure থাকতে হবে। তথ্য বা citation উদ্ভাবন করবেন না। প্রয়োজন হলে missing detail-এর জন্য স্পষ্ট placeholder বা follow-up question দিন।",
    },
    {
      title: "সম্পত্তি নোটিশ",
      excerpt:
        "বাংলাদেশের একজন property lawyer হিসেবে কাজ করুন। জমি partition ও possession dispute নিয়ে একটি formal legal notice প্রস্তুত করুন। এতে title background, disputed act, documentary reference, দাবি করা relief, compliance-এর সময়সীমা এবং unauthorized transfer-এর বিরুদ্ধে সতর্কতা থাকতে হবে। যেখানে facts অসম্পূর্ণ, সেখানে অনুমান না করে placeholder রাখুন।",
    },
    {
      title: "চাকরির এগ্রিমেন্ট",
      excerpt:
        "বাংলাদেশি corporate counsel-এর ভূমিকায় একটি employment agreement প্রস্তুতের জন্য structured AI prompt draft করুন। এতে appointment term, duty, compensation, leave, confidentiality, misconduct, termination, governing law placeholder এবং execution formality অন্তর্ভুক্ত থাকবে। tone formal রাখুন এবং যাচাই ছাড়া statutory compliance দাবি করবেন না।",
    },
  ],
};

export function getDemoGeneratedPrompts(locale: Locale) {
  return demoPrompts[locale];
}
