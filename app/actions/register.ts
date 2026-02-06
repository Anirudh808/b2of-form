"use server";

import prisma from "../lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  grade: z.string().min(1, "Grade is required"),
  schoolName: z.string().min(1, "School Name is required"),
  parentName: z.string().min(1, "Parent Name is required"),
  parentPhone: z.string().min(1, "Phone Number is required"),
  parentEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().min(1, "Address is required"),
  notes: z.string().optional().or(z.literal("")),
  intrestedInSummerCamp: z.enum(["Yes", "No"]),
});

export async function registerUser(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    grade: formData.get("grade"),
    schoolName: formData.get("schoolName"),
    parentName: formData.get("parentName"),
    parentPhone: formData.get("parentPhone"),
    parentEmail: formData.get("parentEmail"),
    address: formData.get("address"),
    notes: formData.get("notes"),
    intrestedInSummerCamp: formData.get("intrestedInSummerCamp"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  try {
    await prisma.userForm.create({
      data: {
        firstName: validatedFields.data.firstName,
        lastName: validatedFields.data.lastName,
        grade: validatedFields.data.grade,
        schoolName: validatedFields.data.schoolName,
        parentName: validatedFields.data.parentName,
        parentPhone: validatedFields.data.parentPhone,
        parentEmail: validatedFields.data.parentEmail || null,
        address: validatedFields.data.address,
        notes: validatedFields.data.notes || null,
        intrestedInSummerCamp: validatedFields.data.intrestedInSummerCamp as "Yes" | "No",
      },
    });
    
    revalidatePath("/admin");
    return { success: true, message: "Registration successful!" };
  } catch (error) {
    console.error("Registration error:", error);
    return { message: "Failed to register. Please try again." };
  }
}
