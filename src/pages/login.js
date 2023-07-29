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
// import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  // Use the onAuthStateChanged method to detect when the user's authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If a redirect URL is specified, navigate to it; otherwise, navigate to home
        const redirectURL = router.query.redirect || "/";
        router.push(redirectURL);
      }
    });

    // Clean up the subscription when the component unmounts
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
      // const user = userCredential.user;
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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.mainTitle}>ValueMesh</h1>

        {/* Add your logo here */}
        {/* <Image
          src="/Screenshot 2023-07-20 at 6.47.28 PM.png"
          alt="Logo"
          className={styles.logo}
          width={500}
          height={300}
        /> */}
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
          <Link href="/signup" passHref>
            <span className={styles.link}>
              Don&apos;t have an account? Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
