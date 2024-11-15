import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb"; // MongoDB client instance
//import authConfig from "@/auth.config";
import { saltAndHashPassword } from "./utils/helper";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  //...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            return null;
          }

          const email = credentials.email as string;
          const hash = saltAndHashPassword(credentials.password);

          // Use MongoDBAdapter to fetch the user instead of a custom model
          const client = await clientPromise;
          const db = client.db(); // Select the default database
          const usersCollection = db.collection("users");
          const user = await usersCollection.findOne({ email });

          //console.log("user----------------->>", user);

          if (!user) {
            console.log("User does not exist");
            if (typeof window !== "undefined") {
              alert("User does not exist");
            }
            return null;
          } else {
            const isMatch = bcrypt.compareSync(
              credentials.password as string,
              user.password
            );
            if (!isMatch) {
              throw new Error("Incorrect password.");
            }
          }
     
          return user as any;
        } catch (error: any) {
          // Catch and handle error for better user experience
          console.log(`[auth][error]: ${error.message}`);
          throw new Error(error.message); // This will be returned to the frontend
        }
      },
    }),
  ],
  //secret: process.env.AUTH_SECRET,
});
