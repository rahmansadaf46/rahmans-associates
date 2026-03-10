import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getServerI18n } from "@/lib/server-i18n";
import { getRegisterSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const { t } = await getServerI18n();
    const body = await request.json();
    const parsed = getRegisterSchema(t).safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ??
            t("validation.auth.invalidRegistrationData"),
        },
        { status: 422 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: parsed.data.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: t("validation.api.accountExists"),
        },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(
      {
        message: t("validation.api.accountCreated"),
        user,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        error: (await getServerI18n()).t("validation.api.registrationFailed"),
      },
      { status: 500 },
    );
  }
}
