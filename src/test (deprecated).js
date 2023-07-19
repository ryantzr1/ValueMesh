// import { NextResponse } from "next/server";
// import { auth } from "./components/config/firebase";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// export async function middleware(req) {
//   // Wrap onAuthStateChanged in a promise to ensure middleware waits for it
//   const user = await new Promise((resolve) => {
//     onAuthStateChanged(auth, resolve);
//   });

//   // If user is signed in and the current path is /login or /signup, redirect to /
//   if (
//     user &&
//     (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup")
//   ) {
//     console.log("The user is already logged in!");
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // If user is not signed in and the current path is /, redirect to /login
//   if (!user && req.nextUrl.pathname === "/") {
//     console.log("The user is NOT logged in!");
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/", "/login", "/signup"],
// };
