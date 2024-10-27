//here we check: when sign , check if password match in db. if match only we can login!

import CredentialsProvider from "next-auth/providers/credentials";  //email & password method.
import { NextAuthOptions } from "next-auth";
//import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import bcrypt from "bcrypt"; //need compare pw
import dbConnect from "./dbConnect";
import { UserType } from "@/types/userTypes";


export const authOptions: NextAuthOptions = {
  session: {
    //creating stateless, secure, and flexible user sessions.
    //without it can't grab additional user info if use later.important!
    strategy: "jwt", 
  },
  providers: [

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "UserName",
          type: "text",
          placeholder: "something"
        },
        email: {
          label: "Email",
          type: "text",
          placeholder: "something"
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if(credentials) 
        dbConnect();
        const { email, password }: any = credentials;
        const user: UserType | null = await User.findOne({ email }); // do this '| null' cuz might no result
        //ts need id: property in user object! esle error underneath 'authorize', so i add id: type in UserType
        if (!user) {
          throw new Error("Invalide email or password.😞");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password); // boolean result
        if (!isPasswordMatched) {
          throw new Error("Invalide email or password.😞 ");
        }

        return user; //contain email & name
      },
    }),
  ],
  
  // callbacks: {
  //   //create user in db
  //   async signIn({ user }) {
  //     const { email, name, image } = user;
  //     dbConnect();

  //     let dbUser = await User.findOne({ email });
  //     if (!dbUser) {
  //       await User.create({
  //         email,
  //         name,
  //         image,
  //       });
  //     }
  //     return true;
  //   },


  //   //cuz we want to get other info besides email, name, image such as role...so we do below: modify token.user
  //   //jwt cb func executed whenever a JSON Web Token (JWT) is created

  //   // jwt: async ({ token, user }) => {
  //   //   const userByEmail = await User.findOne({ email: token.email });
  //   //   userByEmail.password = undefined; // so won't expose pw
  //   //   userByEmail.resetCode = undefined; // so won't expose pw
  //   //   token.user = userByEmail; // assigns the modified user object to token.user, now it contain role as well
  //   //   return token;
  //   // },

  //   //executed when a session is created or updated.
    
  //   // session: async ({ session, token }) => {
  //   //   session.user = token.user as UserType; //assigns user obj from the token to session.user. cast it to UserType
  //   //   return session; // returns the modified session.

  //   //   // by doing all above, we can access role in session!
  //   // },
  // },

  secret: process.env.NEXTAUTH_SECRET,
  
  pages: {
    signIn: "/login", // after we protected the pg using nextAuth, user will be redirect to login if not signin
  },
};
