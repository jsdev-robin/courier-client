import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import SessionManager from "./libs/SessionManager";

const route = {
  path: {
    protected: {
      admin: ["/account"],
    },
    public: [
      "/sign-in",
      "/sign-in/verify-2fa",
      "/sign-up",
      "/verify",
      "/forgot-password",
      "/reset-password",
    ],
  },
};
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const utils = new SessionManager();

  const isProtectedRoute = route.path.protected.admin.some((p) =>
    path.startsWith(p),
  );
  const isPublicRoute = route.path.public.includes(`${path}`);

  const cookie = (await cookies()).get("xad2be3")?.value;
  const session = await utils.decrypt(cookie, process.env.REFRESH_TOKEN);

  if (isProtectedRoute && (!session || session.role !== "admin")) {
    await utils.deleteSession("xad1fe7");
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (isPublicRoute && session && session.role === "admin") {
    return NextResponse.redirect(
      new URL("/account/dashboard/overview", req.nextUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
