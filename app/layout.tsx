//'use client'; // don't worry, the children props if is server component there are still same!

//import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
//import { Toaster } from "react-hot-toast";
//import { GiRunningShoe } from "react-icons/gi";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react"; // after wrap the app , can access the login information!

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

//use client cannot use matadata!
// export const metadata: Metadata = {
//   title: "The Shoe Collector",
//   description: "Shoe e-commerce website using Nextjs full stack",
//   icons: {
//     icon: "/vercel.svg", // Add this line for the favicon
//   },
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`} //antialiased: smooths out the edges of the characters, making them look cleaner and more visually appealing. It's often used in web applications to enhance text readability.
        >
          {/* <Toaster /> */}
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
