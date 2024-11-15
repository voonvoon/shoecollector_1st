// import NextAuth from "next-auth";
// import { authOptions } from "@/utils/authOptions";

// // initializes NextAuth with the specified authOptions.
// // now contains a function that handles authentication requests according to the defined options.
// const handler = NextAuth(authOptions); 


// // exports the handler function, allowing it to be used for both GET and POST requests.
// // allowing NextAuth to handle all relevant authentication flows that may involve these methods
// export {handler as GET, handler as POST}


 export { GET, POST } from "@/auth";

//  export const config = {
//     runtime: 'experimental-edge',
//   };

  

 //export const runtime = "edge";

 
//  import { handlers } from "@/auth"
//  export const { GET, POST } = handlers 