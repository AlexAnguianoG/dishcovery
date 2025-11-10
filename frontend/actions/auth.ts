"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

import { loginUserService, registerUserService } from "@/lib/strapi";
import {
  type FormState,
  SignInFormSchema,
  SignUpFormSchema,
} from "@/validations/auth";

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true, // Only available on the server
  domain: process.env.HOST ?? "localhost",
  secure: process.env.NODE_ENV === "production",
};

export async function loginUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const fields = {
    identifier: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = SignInFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    console.log("Validation errors:", flattenedErrors.fieldErrors);

    return {
      success: false,
      message: "Validation error",
      strapiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: fields,
    };
  }

  const response = await loginUserService(validatedFields.data);

  if (!response || response.error) {
    console.log("Error logging in user:", response.error);

    return {
      success: false,
      message: "Registration failed",
      strapiErrors: response?.error,
      zodErrors: null,
      data: fields,
    };
  }

  const cookiesStore = await cookies();
  cookiesStore.set("jwt", response.jwt, cookieConfig);
  redirect("/dashboard");
}

export async function registerUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const fields = {
    name: formData.get("name") as string,
    username: Date.now().toString() + (formData.get("name") as string),
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = SignUpFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    console.log("Validation errors:", flattenedErrors.fieldErrors);

    return {
      success: false,
      message: "Validation error",
      strapiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: {
        ...prevState.data,
        ...fields,
      },
    };
  }

  const response = await registerUserService(validatedFields.data);

  if (!response || response.error) {
    console.log("Error registering user:", response.error);

    return {
      success: false,
      message: "Registration failed",
      strapiErrors: response?.error,
      zodErrors: null,
      data: fields,
    };
  }

  const cookiesStore = await cookies();
  cookiesStore.set("jwt", response.jwt, cookieConfig);
  redirect("/dashboard");
}
