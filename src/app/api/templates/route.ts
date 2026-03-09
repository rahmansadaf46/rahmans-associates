import { NextResponse } from "next/server";

import { sanitizeSingleLine } from "@/lib/safety";
import { getPublishedTemplates } from "@/server/services/template-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = sanitizeSingleLine(searchParams.get("search"), 120)?.toLowerCase();
  const category = sanitizeSingleLine(searchParams.get("category"), 80);

  const templates = await getPublishedTemplates();
  const filtered = templates.filter((template) => {
    const matchesSearch = search
      ? [template.title, template.description, template.promptBody, template.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(search)
      : true;
    const matchesCategory = category ? template.category === category : true;

    return matchesSearch && matchesCategory;
  });

  return NextResponse.json({ templates: filtered });
}
