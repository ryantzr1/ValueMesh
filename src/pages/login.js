import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/config/firebase";
import styles from "../styles/signup.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      router.push("/");
    } catch (error) {
      const errorMessage = error.message;
      setError("Invalid Username/Password. Please try again");
    }
  };

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
