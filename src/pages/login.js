import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../components/config/firebase";
import styles from "../styles/signup.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const redirectURL = router.query.redirect || "/";
        router.push(redirectURL);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      const errorMessage = error.message;
      setError("Invalid Username/Password. Please try again");
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  // Here's the new code to include the 'redirect' query parameter in the Sign Up link.
  const signupUrl = router.query.redirect
    ? `/signup?redirect=${encodeURI(router.query.redirect)}`
    : "/signup";

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.mainTitle}>ValueMesh</h1>
        <h2 className={styles.title}>Sign in to your account</h2>
        <form onSubmit={handleSignIn}>
          <input
            name="email"
            type="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className={styles.input}
          />
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Loading..." : "Sign in"}
          </button>
          <button
            onClick={handleSignInWithGoogle}
            className={styles.buttonGoogle}
          >
            <FcGoogle size={24} />
            <span style={{ marginLeft: "8px" }}>Sign in with Google</span>
          </button>
        </form>
        <div className={styles.linkContainer}>
          <Link href={signupUrl} passHref>
            <span className={styles.link}>
              Don&apos;t have an account? Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
