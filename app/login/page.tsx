"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { IoLogoGoogle } from "react-icons/io5";
//import Link from "next/link";
//import { IoLogoGoogle } from "react-icons/io5";
//import { CiUser } from "react-icons/ci";

export default function Login() {
  const [email, setEmail] = useState("testing@gmail.com");
  const [password, setPassword] = useState("123321");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false, // redirect to pg we want after we get the result!
        email,
        password,
      });

      if (result?.error) {
        toast.error(result?.error);
        setLoading(false);
      } else {
        toast.success("Logged in successfully🎉!");
        //router.push("/");
        router.push(callbackUrl);
      }
    } catch (err) {
      console.log(err); // use err cuz is how use in api server
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Enter your password"
          />

          <button
            className="cursor-pointer w-full h-12 flex items-center justify-center bg-gray-700 text-white rounded-full py-3 px-6 shadow-md hover:bg-gray-600 transition duration-300 mt-6"
            disabled={loading || !email || !password}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <button
              className="flex items-center justify-center relative h-12 overflow-hidden rounded-full border-0 bg-[#374151] bg-opacity-100 py-2.5 px-8 text-white text-opacity-100 no-underline hover:no-underline transition-colors duration-300 hover:text-gray-200 mt-6 shadow-md hover:bg-opacity-90 w-full"
              onClick={() => signIn("google", { callbackUrl })}
            >
              <div className="flex items-center justify-center">
                Sign In With Google <IoLogoGoogle className="ml-1" />
              </div>
            </button>
      </div>
    </main>
  );
}
