import { NextRequest, NextResponse } from "next/server";
import {
  publicBasePath,
  publicPaths,
  userBasePath,
  userPaths,
} from "./constants/paths";

export function middleware(request: NextRequest) {
  const cookieUser = request.cookies.get(
    process.env.NEXT_PUBLIC_USER_COOKIE_KEY!
  );

  if (cookieUser) {
    if (userPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(userBasePath, request.url));
  }

  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(publicBasePath, request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
