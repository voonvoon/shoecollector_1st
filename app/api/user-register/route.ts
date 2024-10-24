import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt"; //npm i --save-dev @types/bcrypt

export async function POST(req: Request) {
  await dbConnect(); // connect to mgdb first
  const body = await req.json();
  const { name, email, password } = body;

  try {
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10), 
      //(plain-text password, salt rounds  8 - 40)
      //salt:how many times the hashing algorithm is applied to the password.
    });

    console.log("user Created =>", user);

    return NextResponse.json({ success: "User Register Success!" });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
