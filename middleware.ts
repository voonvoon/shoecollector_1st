//export { auth as middleware } from "@/auth";
//import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const protectedRoutes = ["/middlewarepage"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtected) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  //runtime: "experimental-edge",
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  //matches:['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)'],
  //matcher: [ "/dashboard/:path*", "/api/user/:path*", "/api/admin/:path*"],
};

// import { NextResponse } from "next/server"; // Used to handle server responses
// import { auth } from "@/auth"; // Import your custom auth function
// import type { NextRequest } from "next/server"; // Import request type for Next.js
// import { UserType } from "./types/userTypes";

// export const config = {
//   matcher: ["/dashboard/:path*", "/api/user/:path*", "/api/admin/:path*"], // Protect specific routes
// };

// export default async function middleware(req: NextRequest) {
//   const url = req.nextUrl.pathname;

//   // Call your custom auth function to get the session data
//   const session = await auth();

//   // Check if the session exists
//   if (!session) {
//     return NextResponse.redirect(new URL("/", req.url)); // Redirect to the home page if not authenticated
//   }

//   // Extract user role from session, ensuring it matches UserType
//   const userRole = (session.user as UserType)?.role;

//   // Protect admin routes by checking user role
//   if (url.includes("/admin") && userRole !== "admin") {
//     return NextResponse.redirect(new URL("/", req.url)); // Redirect if user is not an admin
//   }

//   return NextResponse.next(); // Allow request if checks pass
// }
