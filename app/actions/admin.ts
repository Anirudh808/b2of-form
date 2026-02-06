"use server";

import prisma from "../lib/db";
import { cookies } from "next/headers";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin";
const COOKIE_NAME = "admin_session";

export async function verifyLogin(prevState: any, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, "true", { httpOnly: true, path: "/" });
    return { success: true };
  } else {
    return { success: false, message: "Invalid username or password" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getRegistrations() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get(COOKIE_NAME)?.value === "true";

  if (!isLoggedIn) {
    return { authorized: false, data: [] };
  }

  try {
    const data = await prisma.userForm.findMany({
      orderBy: { createdAt: "desc" },
    });

    return { authorized: true, data };
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    return { authorized: true, data: [] }; // Still authorized, just error
  }
}

export async function checkAuth() {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value === "true";
}
