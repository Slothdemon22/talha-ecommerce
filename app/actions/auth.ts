"use server";

import { db } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signUpAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return { error: "A user with this email already exists" };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        name: name || null,
      },
    });

    await createSession(user.id, user.email, user.name || undefined);
  } catch (error: any) {
    console.error("Signup error:", error);
    return { error: "An unexpected error occurred during sign up" };
  }

  redirect("/");
}

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return { error: "Invalid email or password" };
    }

    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordsMatch) {
      return { error: "Invalid email or password" };
    }

    await createSession(user.id, user.email, user.name || undefined);
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred during login" };
  }

  redirect("/");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
