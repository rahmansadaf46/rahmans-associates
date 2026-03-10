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
        "Prepare a professional bail application for a criminal matter under applicable Bangladeshi law. Include case background, grounds for bail, legal provisions to verify, prayer, and a formal court-ready structure. Do not invent facts or citations. If anything is missing, mark the missing points clearly.",
    },
    {
      title: "Property Notice",
      excerpt:
        "Prepare a formal legal notice regarding a land partition and possession dispute. Include title background, disputed acts, documentary references, relief demanded, time for compliance, and a warning against unauthorized transfer. Where facts are incomplete, mark those gaps clearly instead of assuming details.",
    },
    {
      title: "Employment Agreement",
      excerpt:
        "Prepare clear drafting help for an employment agreement. Include appointment terms, duties, compensation, leave, confidentiality, misconduct, termination, governing law details to confirm, and execution formalities. Keep the tone formal and avoid claiming statutory compliance without verification.",
    },
  ],
  bn: [
    {
      title: "ফৌজদারি মামলার জামিন আবেদন",
      excerpt:
        "প্রযোজ্য বাংলাদেশি আইনের আলোকে একটি ফৌজদারি মামলার জন্য পেশাদার জামিন আবেদন প্রস্তুত করুন। এতে মামলার পটভূমি, জামিনের ভিত্তি, যাচাইযোগ্য আইনি ধারা, প্রার্থনা অংশ এবং আদালত-উপযোগী গঠন থাকতে হবে। তথ্য বা উদ্ধৃতি উদ্ভাবন করবেন না। কিছু বাদ থাকলে তা স্পষ্টভাবে চিহ্নিত করুন।",
    },
    {
      title: "সম্পত্তি-সংক্রান্ত আইনি নোটিশ",
      excerpt:
        "জমি ভাগবাটোয়ারা ও দখলসংক্রান্ত বিরোধ নিয়ে একটি আনুষ্ঠানিক আইনি নোটিশ প্রস্তুত করুন। এতে মালিকানার পটভূমি, বিরোধের ঘটনা, নথির উল্লেখ, চাওয়া প্রতিকার, জবাবের সময়সীমা এবং অননুমোদিত হস্তান্তরের বিরুদ্ধে সতর্কতা থাকতে হবে। যেখানে তথ্য অসম্পূর্ণ, সেখানে অনুমান না করে তা স্পষ্টভাবে চিহ্নিত করুন।",
    },
    {
      title: "চাকরির চুক্তি",
      excerpt:
        "একটি চাকরির চুক্তি প্রস্তুতের জন্য গুছানো সহায়তা তৈরি করুন। এতে নিয়োগের শর্ত, দায়িত্ব, পারিশ্রমিক, ছুটি, গোপনীয়তা, অসদাচরণ, চাকরি শেষ হওয়ার শর্ত, প্রযোজ্য আইন সম্পর্কিত যাচাইযোগ্য তথ্য এবং স্বাক্ষরের আনুষ্ঠানিকতা থাকতে হবে। ভাষা আনুষ্ঠানিক রাখুন এবং যাচাই ছাড়া আইনি সামঞ্জস্যের দাবি করবেন না।",
    },
  ],
};

export function getDemoGeneratedPrompts(locale: Locale) {
  return demoPrompts[locale];
}
