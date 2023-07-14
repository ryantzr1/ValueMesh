import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

const supabase = createClientComponentClient();

function SignOut() {
  const handleSignOut = async () => {
    console.log("signing out");
    await supabase.auth.signOut();
    router.push("/");
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
