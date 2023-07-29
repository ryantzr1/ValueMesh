import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../components/config/firebase";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/signup.module.css";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleSignUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  // Check for the redirect URL and include it in the login URL
  const loginUrl = router.query.redirect
    ? `/login?redirect=${encodeURI(router.query.redirect)}`
    : "/login";

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.mainTitle}>ValueMesh</h1>
        <h2 className={styles.title}>Create your account</h2>
        <form onSubmit={handleSignUp}>
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
            {loading ? "Loading..." : "Sign up"}
          </button>
          <button
            onClick={handleSignUpWithGoogle}
            className={styles.buttonGoogle}
          >
            <FcGoogle size={24} />
            <span style={{ marginLeft: "8px" }}>Sign up with Google</span>
          </button>
        </form>
        <div className={styles.linkContainer}>
          <Link href={loginUrl} passHref>
            <span className={styles.link}>
              Already have an account? Sign in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
