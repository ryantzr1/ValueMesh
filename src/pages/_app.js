import React from "react";
import "@/styles/globals.css";
// import { AuthContextProvider } from "../context/AuthContext";

import UserProvider from "../UserProvider";

function MyApp({ Component, pageProps }) {
  return (
    // <AuthContextProvider>
    <UserProvider>
      <div className="container mx-auto p-4">
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}

export default MyApp;
