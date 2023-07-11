import React from "react";
import "@/styles/globals.css";
// import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    // <AuthContextProvider>
    <div className="container mx-auto p-4">
      <Component {...pageProps} />
    </div>
    // </AuthContextProvider>
  );
}

export default MyApp;
