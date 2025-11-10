import { cacheLife } from "next/cache";
import qs from "qs";

import type { SignInFormSchema, SignUpFormSchema } from "@/validations/auth";

import { HOME_PAGE_QUERY } from "./queries/home-page";

export const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;

export async function getHomePage() {
  "use cache";
  cacheLife({ expire: 60 }); // 1 minute

  const query = qs.stringify(HOME_PAGE_QUERY);
  const response = await getStrapiData(`/api/home-page?${query}`);
  return response.data;
}

export async function getStrapiData(url: string) {
  const fullUrl = `${STRAPI_BASE_URL}${url}`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function registerUserService(userData: SignUpFormSchema) {
  const url = `${STRAPI_BASE_URL}/api/auth/local/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function loginUserService(loginData: SignInFormSchema) {
  const url = `${STRAPI_BASE_URL}/api/auth/local`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}
