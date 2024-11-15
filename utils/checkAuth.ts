// utils/checkAuth.ts
import { NextApiRequest, NextApiResponse } from "next";
//import { getSession } from 'your-auth-library';
import { auth } from "@/auth";

export async function checkAuth() {
  const session = await auth();

  if (!session) {
    return false;
  }

  return true;
}
