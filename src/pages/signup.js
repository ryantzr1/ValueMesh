import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../components/config/firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/signup.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const googleProvider = new GoogleAuthProvider();

  const handleSignUp = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleSignUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      router.push("/");
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

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
            Sign up with Google
          </button>
        </form>
        <div className={styles.linkContainer}>
          <Link href="/login" passHref>
            <span className={styles.link}>
              Already have an account? Sign in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
