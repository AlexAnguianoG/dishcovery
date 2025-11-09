import { cacheLife } from "next/cache";
import qs from "qs";

import { HOME_PAGE_QUERY } from "./queries/home-page";

export const STRAPI_BASE_URL =
  process.env.STRAPI_BASE_URL || "http://localhost:1337";

export async function getHomePage() {
  "use cache";
  cacheLife({ expire: 60 }); // 1 minute

  const query = qs.stringify(HOME_PAGE_QUERY);
  const response = await getStrapiData(`/api/home-page?${query}`);
  return response.data;
}

export async function getStrapiData(url: string) {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}${url}`);
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
