"use server";

import { db } from "@/lib/db";
import { linkGuestOrdersToUser } from "@/lib/orders";
import { getSafeRedirectPath } from "@/lib/redirect";
import { createSession, deleteSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signUpAction(prevState: unknown, formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const name = (formData.get("name") as string)?.trim();
  const redirectTo = getSafeRedirectPath(formData.get("redirect") as string);

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return { error: "A user with this email already exists" };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        name: name || null,
      },
    });

    await linkGuestOrdersToUser(user.id, normalizedEmail);
    await createSession(user.id, user.email, user.name || undefined);
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "An unexpected error occurred during sign up" };
  }

  redirect(redirectTo);
}

export async function loginAction(prevState: unknown, formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const redirectTo = getSafeRedirectPath(formData.get("redirect") as string);

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return { error: "Invalid email or password" };
    }

    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordsMatch) {
      return { error: "Invalid email or password" };
    }

    await linkGuestOrdersToUser(user.id, normalizedEmail);
    await createSession(user.id, user.email, user.name || undefined);
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred during login" };
  }

  redirect(redirectTo);
}

export async function logoutAction() {
  await deleteSession();
  redirect("/");
}
