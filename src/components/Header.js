import React from "react";
import Logo from "./Logo";
import useUser from "../hooks/useUser";
import { auth } from "../utils/firebase";
import styles from "./Header.module.css";

function Header() {
  const user = useUser();
  const onLogout = () => {
    auth.signOut();
  };

  return (
    <header>
      <div className={styles.headerInnerContainer}>
        <Logo size={28} />
        <span className={styles.headerBeepy}>Beepy</span>
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
