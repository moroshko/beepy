import React from "react";
import classNames from "classnames";
import Logo from "./icons/Logo";
import { MenuIcon, HomeIcon, ListIcon, CloseIcon } from "./icons";
import useUser from "../hooks/useUser";
import { getEnv } from "../utils/env";
import { auth } from "../utils/firebase";
import styles from "./Header.module.css";

function Header({ page, onPageChange, isMenuOpen, onMenuToggle }) {
  const env = getEnv();
  const user = useUser();
  const headerText =
    user !== null && isMenuOpen
      ? "Menu"
      : page === "history"
      ? "History"
      : env === "prod"
      ? "Beepy"
      : "Beepy (Test)";
  const onLogout = () => {
    auth.signOut();
  };

  return (
    <header>
      <div className={styles.headerInnerContainer}>
        <Logo size={28} />
        <span className={styles.headerBeepy}>{headerText}</span>
        {user !== null && (
          <button className={styles.menuButton} onClick={onMenuToggle}>
            {isMenuOpen ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
          </button>
        )}
        {user !== null && isMenuOpen && (
          <nav>
            <ul>
              <li>
                <button
                  className={classNames(styles.menuItem, {
                    [styles.menuItemCurrent]: page === "home",
                  })}
                  onClick={() => {
                    onPageChange("home");
                  }}
                >
                  <HomeIcon size={28} />
                  Home
                </button>
              </li>
              <li>
                <button
                  className={classNames(styles.menuItem, {
                    [styles.menuItemCurrent]: page === "history",
                  })}
                  onClick={() => {
                    onPageChange("history");
                  }}
                >
                  <ListIcon size={28} />
                  History
                </button>
              </li>
              <li className={styles.loginInfo}>
                You are logged in as:
                <br />
                {user.email}
                <br />
                <button className={styles.logoutButton} onClick={onLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
