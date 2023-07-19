import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/config/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const validateForm = () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return false;
    }
    return true;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    // if (!validateForm()) {
    //   return;
    // }

    // setLoading(true);
    // setError(null);

    // const { error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    // setLoading(false);

    // if (error) {
    //   setError(error.message);
    // } else {
    //   router.push("/");
    // }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      console.log("Success");
      router.push("/");
      console.log("testing123");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <input
          name="email"
          type="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
        <input
          type="password"
          name="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
        {error && <div className="text-red-500 text-center">{error}</div>}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
        <div className="text-center">
          <Link
            className="text-indigo-600 hover:text-indigo-500"
            href="/signup"
          >
            Don{"'"}t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
