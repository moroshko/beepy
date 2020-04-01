import React, { useState } from "react";
import { auth } from "../utils/firebase";
import styles from "./Login.module.css";

/*
  red: #E84855
  yellow: #F9DC5C
  green: #1CB265
*/

const errorCodesMap = {
  "auth/invalid-email": "Invalid email.",
  "auth/wrong-password": "Invalid password.",
  "auth/user-not-found": "Invalid email or password.",
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    auth
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .catch((error) => {
        setIsSubmitting(false);
        setError(errorCodesMap[error.code] ?? error.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Welcome!</h1>
        <h2>
          Let's start tracking your
          <br />
          Blood Pressure.
        </h2>
      </div>
      <form method="POST" onSubmit={onSubmit} noValidate>
        <div className={styles.emailContainer}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className={styles.input}
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.passwordContainer}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className={styles.input}
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.footer}>
          <button
            className={styles.button}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Login"}
          </button>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </form>
    </div>
  );
}

export default Login;
