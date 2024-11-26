import { NextResponse } from "next/server";
import fetchApiServer from "./action/server/fetchApi";

export const config = {
  matcher: ["/api/:function*"],
};

export async function middleware(request) {
  try {
    const pathname = request.nextUrl.pathname.replace(/api\//, "");
    const isPathLogin = pathname === "/auth/login";
    let requestHeaders;

    if (!isPathLogin) {
      const authToken = request.cookies.get("auth-token")?.value;
      request.cookies.clear();

      if (authToken) {
        requestHeaders = new Headers(request.headers);
        requestHeaders.set("Authorization", "bearer " + authToken);
      }
    } else {
      const requestBody = await request.json();
      const { error, result } = await fetchApiServer(
        pathname,
        requestBody,
        request.method,
        process.env.NEXT_PUBLIC_API_URL
      );

      if (error) throw error;

      if (result) {
        const { data, status, success } = result;
        const { token, ...dataLogin } = data;
        const response = NextResponse.json(
          { status, data: dataLogin, success },
          {
            status: status || 200,
          }
        );
        response.cookies.set("auth-token", token, {
          httpOnly: true,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 27,
          path: "/",
        });
        return response;
      } else throw new Error("Tidak memiliki respon dari server");
    }
    return NextResponse.rewrite(
      new URL(`${process.env.NEXT_PUBLIC_API_URL}${pathname}`),
      {
        request: {
          headers: requestHeaders,
        },
      }
    );
  } catch (error) {
    if (error?.status) {
      return NextResponse.json({ ...error });
    } else {
      console.log(error?.message);
      return;
    }
  }
}
