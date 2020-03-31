import React from "react";
import Logo from "./Logo";
import useUser from "../hooks/useUser";
import { getEnv } from "../utils/env";
import { auth } from "../utils/firebase";
import styles from "./Header.module.css";

function Header() {
  const env = getEnv();
  const user = useUser();
  const onLogout = () => {
    auth.signOut();
  };

  return (
    <header>
      <div className={styles.headerInnerContainer}>
        <Logo size={28} />
        <span className={styles.headerBeepy}>
          {env === "prod" ? "Beepy" : "Beepy Test"}
        </span>
        {user !== null && (
          <button className={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
