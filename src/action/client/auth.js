"use client";
import fetchApiClient from "./fetchApi";

export default async function auth(dataForm, type) {
  try {
    const response = await fetchApiClient(
      `/api/auth/${type}`,
      dataForm,
      "POST"
    );

    let errorMessage = response?.error?.message;
    if (response?.error?.message?.validate) {
      errorMessage = errorMessage?.validate;
    }

    if (!response.error && !response.result) throw response;

    return { error: errorMessage, result: response?.result?.data };
  } catch (error) {
    return { error: "Coba lagi", result: null };
  }
}
