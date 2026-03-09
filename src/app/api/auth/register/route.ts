import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message ?? "Invalid registration data.",
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
          error: "An account with this email already exists.",
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
        message: "Account created successfully.",
        user,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        error: "Registration failed due to a server error.",
      },
      { status: 500 },
    );
  }
}
