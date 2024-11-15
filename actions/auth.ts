"use server";

import { signIn, signOut } from "@/auth";
//import { db } from "@/db";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
//import { saltAndHashPassword } from "@/utils/helper";


const getUserByEmail = async (email: string) => {
  // try {
  //   const user = await db.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  //   return user;
  // } catch (error) {
  //   console.log(error);
  //   return null;
  // }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const loginWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    role: "ADMIN",
    redirectTo: "/",
  };

  const existingUser = await getUserByEmail(formData.get("email") as string);
  console.log(existingUser); // this part not required

  try {
    await signIn("credentials", rawFormData);
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
  revalidatePath("/");
};

// export const RegisterWithCreds = async (formData: FormData) => {
//   const rawFormData = {
//     email: formData.get("email"),
//     password: formData.get("password"),
//     role: "ADMIN",
//     redirectTo: "/",
//   };

//   const existingUser = await getUserByEmail(formData.get("email") as string);
//   console.log(existingUser); // this part not required

//   try {
//     const email = rawFormData.email as string;
//     const hash = saltAndHashPassword(rawFormData.password);

//     if (!existingUser) {
//       const user = await db.user.create({
//         data: {
//           email,
//           hashedPassword: hash,
//         },
//       });
//     }
//   } catch (error: any) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         default:
//           return { error: "Something went wrong!" };
//       }
//     }

//     throw error;
//   }
//   revalidatePath("/");
// };
