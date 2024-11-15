import { NextResponse } from "next/server"; // is a way to bring in a built-in helper from Next.js to handle HTTP responses in API routes.
import dbConnect from "@/utils/dbConnect";
import { auth } from "@/auth";
import { checkAuth } from "@/utils/checkAuth";

// export const config = {
//   runtime: "experimental-edge",
// };

export async function GET(req: Request) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({
      message: "unauthorized!",
      status: "Failed",
      time: new Date().toLocaleString(),
    });
  }
  
  return NextResponse.json({
    message: "API is working fine!",
    status: "success",
    time: new Date().toLocaleString(),
  });

  // try {
  //   await dbConnect(); // Try connecting to the database
  //   return NextResponse.json({ message: "Connection successful yeah!" });
  // } catch (error: unknown) {
  //   // Check if the error is an instance of Error to safely access error.message
  //   if (error instanceof Error) {
  //     return NextResponse.json({
  //       message: "Connection failed",
  //       error: error.message,
  //     });
  //   }
  // }
}

//In TypeScript, using any allows anything to pass through without any checks, which defeats the purpose of type safety.
//Instead, using unknown is safer because it forces us to explicitly check the type before using it.
//Errors can come in different forms, not just as Error objects (they could be strings, numbers, etc.), and we can't always assume the error will have a message property.
//By using unknown, we make sure that we handle all possible error types. We then narrow the type by checking if the error is an instance of Error.
//This way, if it is indeed an Error, we can safely access error.message. If not, we handle it as a general error, converting it to a string for a more controlled output.

//NropjAoXyQh2vxYA
//mongodb+srv://hvlifeasy:<db_password>@shoecollector.5jbfj.mongodb.net/?retryWrites=true&w=majority&appName=shoecollector

// export const GET = auth(function GET(req) {
//   if (req.auth) return NextResponse.json(req.auth);
//   return NextResponse.json({ message: "API is working fine!", status: "success", time: new Date().toLocaleString() });

// })
