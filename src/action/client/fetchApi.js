"use client";

import axios from "axios";

const fetchApiClient = async (pathname, requestBody, method, host) => {
  if (!method || method == null || method == undefined || method == "")
    return { error: "Method API is null", result: null };

  try {
    const baseUrl = host
      ? host
      : window.location.protocol + "//" + window.location.host;

    const fetchData = await axios({
      baseURL: baseUrl,
      url: pathname,
      method: method,
      timeout: 5000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(requestBody),
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
    });

    const response = await fetchData.data;
    const status = fetchData.status;

    if (response?.success) {
      const { data, success } = response;
      return {
        error: null,
        result: { data, status, success },
      };
    } else {
      throw response;
    }
  } catch (error) {
    if (error?.status) {
      const { status, response, message } = error;
      return {
        error: {
          status,
          message: response?.data?.message || message,
        },
        result: null,
      };
    }
  }
};

export default fetchApiClient;
