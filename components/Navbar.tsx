"use client";

import { useState } from "react";
import Link from "next/link";
import { GiRunningShoe } from "react-icons/gi";
import { IoMenu } from "react-icons/io5";
import { UserType } from "@/types/userTypes";

import { useSession, signOut } from "next-auth/react";


const Navbar = () => {
  const { data, status } = useSession();
  const user = data?.user as UserType;  // Use type assertion to specify User type
  console.log("login Status", { data, status });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center justify-start">
            <div className="flex items-center justify-center">
              <Link href="/" className="flex flex-col items-center">
                <GiRunningShoe size={30} color="white" />
                <span className="text-xs text-white mt-1">Shoe Collector</span>
              </Link>
            </div>
          </div>
          <div className="absolute right-0 flex items-center ">
            <button
              className="flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
              onClick={toggleMenu}
            >
              <IoMenu size={30} />
            </button>
          </div>

          <div className="absolute right-10">
            {status === "authenticated" ? (
              <>
                <Link
                  href="/dashboard/user"
                  className="rounded-md px-1 py-2 text-sm  text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {user?.name} ({user?.role})
                </Link>
                <a
                  className="cursor-pointer rounded-md px-1 py-2 text-sm  text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-1 py-2 text-sm  text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/user-register"
                  className="rounded-md px-1 py-2 text-sm  text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-1000 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 "
        }`}
      >
        <div className="px-2 pb-1 pt-2 text-center  transition-all duration-300 ease-in-out">
          <Link
            href="/product"
            className="block rounded-md px-3 py-2 text-sm  text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Product
          </Link>
          <Link
            href="/dashboard"
            className="block rounded-md px-3 py-2 text-sm  text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
