import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is / redirect the user to /account
  if (
    (user && req.nextUrl.pathname === "/login") ||
    (user && req.nextUrl.pathname === "/signup")
  ) {
    console.log(" The user is already logged in! ");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname === "/") {
    console.log(" The user is NOT  logged in! ");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // console.log(user);

  return res;
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};
