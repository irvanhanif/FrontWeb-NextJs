import { headers } from "next/headers";

const fetchApiServer = async (pathname, requestBody, method, host) => {
  if (!method || method == null || method == undefined || method == "")
    return { error: "Method API is null", result: null };

  try {
    const headerRequest = await headers();

    const baseUrl = host
      ? host
      : headerRequest.get("x-forwarded-proto") +
        "://" +
        headerRequest?.get("host");

    const optionFetch = {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
    };
    if (method.toLowerCase() !== "get" && requestBody != null)
      optionFetch["body"] = JSON.stringify(requestBody);

    const fetchData = await fetch(baseUrl + pathname, optionFetch);

    const response = await fetchData.json();
    const status = fetchData.status;

    if (response?.success) {
      return {
        error: null,
        result: { status, ...response },
      };
    } else {
      return {
        error: {
          status,
          ...response,
        },
        result: null,
      };
    }
  } catch (error) {
    console.log(error, "error");
    console.log(error?.response, "error fetch");
  }
};

export default fetchApiServer;
