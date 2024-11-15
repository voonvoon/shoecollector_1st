import { auth } from "@/auth";
import React from "react";
//import { checkAuth } from "@/utils/checkAuth";

const Middleware = async () => {
  
  // const isAuthenticated = await checkAuth();
  // if (!isAuthenticated) {
  //   // Redirect to login if the user is not authenticated
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   };
  // }


  const session = await auth();
  return (
    <main className="flex h-full items-center justify-center flex-col gap-2">
      <h1 className="text-3xl">Middleware page</h1>
      <p className="text-lg">{session?.user?.email}</p>
    </main>
  );
};

export default Middleware;
