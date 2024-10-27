//export {default} from "next-auth/middleware";

//This function from next-auth/middleware helps create middleware for route protection.
import { withAuth, NextAuthMiddlewareOptions } from "next-auth/middleware"; //used for authentication middleware in Next.js app
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server"; //used to handle server responses in Next.js app
import { UserType } from "@/types/userTypes";

export const config = {
  //any route under /dashboard, /api/user, and /api/admin will be protected.
  matcher: ["/dashboard/:path*", "/api/user/:path*", "/api/admin/:path*"],
}; // tis way all route after /***/ will protected , must ber either user/admin

//The withAuth func is called with two arg: async middleware func and a callbacks object.
export default withAuth(
  async function middleware(req) {
    //Gets the current request’s path.
    const url = req.nextUrl.pathname; //e.g: dashboard/user

    //const userRole = req?.nextauth?.token?.user?.role;
    const userRole = (req?.nextauth?.token?.user as UserType)?.role;
    console.log("userRole -------------------------------->", userRole);

    if (url?.includes("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    //callbacks obj within the 2nd argument of withAuth likely specifies cb func to be executed during the authentication process.
    //single authorized callback func checks if a token exists. If no token exists, it returns false, indicating that the request is not authorized.
    callbacks: {
      //authorized: Ensures a token exists. If there's no token, it denies access by returning false.
      authorized: ({ token }) => {
        //console.log('token from authorized --------------------->', token);
        if (!token) {
          return false;
        }
      },
    },
  } as NextAuthMiddlewareOptions  //properly typed according to NextAuth's expected structure
);








// req --------------------------------------------> {
//   cookies: RequestCookies {"next-auth.csrf-token":{"name":"next-auth.csrf-token","value":"a8fd2c895fa3e217cf2a7ec0a3a8239614ddd115b7aeb33b05f2bddb82edfbaf|051cc160cc19b98bfb4bbf53c89a1a0947962635c3f7d049e3ff3356e55aaac0"},"next-auth.callback-url":{"name":"next-auth.callback-url","value":"http://localhost:3000/login"},"next-auth.session-token":{"name":"next-auth.session-token","value":"eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Ol46rd5IN_BBp6OG.au6gTetjNdbYxHZ7vhFQrDFR_qyCeTfUk1Nbd2z5CPlHDLAOvwRYrhc4XmKSkSzUG9mIjwZ5VlyMN0pB6ZefaymaFj64ijkCG0pUxE1tTt6LzghOhi8Yx6GtbVDuqoEqg4Aw8umPJb8P1g_Qt9FWlg6Lb1rU0ZDR9lMmyLGfi-buv4ySvP496WThREPNoA1XrMO11j9ZHxFKU9hXkG8.X44z8dWKwbzrMA81O3oCug"}},
//   nextUrl: {
//   href: 'http://localhost:3000/dashboard/user',
//   origin: 'http://localhost:3000',
//   protocol: 'http:',
//   username: '',
//   password: '',
//   host: 'localhost:3000',
//   hostname: 'localhost',
//   port: '3000',
//   pathname: '/dashboard/user',
//   search: '',
//   searchParams: URLSearchParams {  },
//   hash: ''
// },
//   url: 'http://localhost:3000/dashboard/user',
//   bodyUsed: false,
//   cache: 'default',
//   credentials: 'same-origin',
//   destination: '',
//   headers: {
//   accept: '*/*',
//   accept-encoding: 'gzip, deflate, br, zstd',
//   accept-language: 'en-GB,en-US;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6,ms;q=0.5,la;q=0.4',
//   connection: 'keep-alive',
//   cookie: 'next-auth.csrf-token=a8fd2c895fa3e217cf2a7ec0a3a8239614ddd115b7aeb33b05f2bddb82edfbaf%7C051cc160cc19b98bfb4bbf53c89a1a0947962635c3f7d049e3ff3356e55aaac0; next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000%2Flogin; next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Ol46rd5IN_BBp6OG.au6gTetjNdbYxHZ7vhFQrDFR_qyCeTfUk1Nbd2z5CPlHDLAOvwRYrhc4XmKSkSzUG9mIjwZ5VlyMN0pB6ZefaymaFj64ijkCG0pUxE1tTt6LzghOhi8Yx6GtbVDuqoEqg4Aw8umPJb8P1g_Qt9FWlg6Lb1rU0ZDR9lMmyLGfi-buv4ySvP496WThREPNoA1XrMO11j9ZHxFKU9hXkG8.X44z8dWKwbzrMA81O3oCug',
//   host: 'localhost:3000',
//   next-url: '/',
//   referer: 'http://localhost:3000/',
//   sec-ch-ua: '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
//   sec-ch-ua-mobile: '?0',
//   sec-ch-ua-platform: '"Windows"',
//   sec-fetch-dest: 'empty',
//   sec-fetch-mode: 'cors',
//   sec-fetch-site: 'same-origin',
//   user-agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
//   x-forwarded-for: '::1',
//   x-forwarded-host: 'localhost:3000',
//   x-forwarded-port: '3000',
//   x-forwarded-proto: 'http'
// },
//   integrity: '',
//   keepalive: false,
//   method: 'GET',
//   mode: 'cors',
//   redirect: 'follow',
//   referrer: 'about:client',
//   referrerPolicy: '',
//   signal: AbortSignal {
//   [Symbol(kEvents)]: SafeMap(0) {},
//   [Symbol(events.maxEventTargetListeners)]: 10,
//   [Symbol(events.maxEventTargetListenersWarned)]: false,
//   [Symbol(kHandlers)]: SafeMap(0) {},
//   [Symbol(kAborted)]: false,
//   [Symbol(kReason)]: undefined,
//   [Symbol(kOnabort)]: undefined,
//   [Symbol(realm)]: {
//   settingsObject: {
//   baseUrl: undefined,
//   origin: [Getter],
//   policyContainer: { referrerPolicy: 'strict-origin-when-cross-origin' }
// }
// }
// }
// }
