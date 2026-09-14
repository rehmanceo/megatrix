import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const locale = acceptLanguage.toLowerCase().includes("sv") ? "se" : "us";
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = {
  matcher: "/",
};
