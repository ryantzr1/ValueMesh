import React from "react";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../components/config/firebase";

function SignOut() {
  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <footer
        style={{
          position: "fixed",
          bottom: "16px",
          left: "16px",
          color: "black",
          textAlign: "left",
        }}
      >
        <button onClick={handleSignOut}>Sign Out</button>
      </footer>
    </div>
  );
}

export default SignOut;
