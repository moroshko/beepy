import React, { useReducer, useEffect } from "react";
import classNames from "classnames";
import Header from "./Header";
import Login from "./Login";
import Home from "./Home";
import History from "./History";
import Logo from "./icons/Logo";
import { UserProvider } from "../hooks/useUser";
import { initFirebase, auth } from "../utils/firebase";
import styles from "./App.module.css";

const initialState = {
  user: undefined,
  page: undefined,
  isMenuOpen: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "auth-changed": {
      return {
        ...state,
        user: action.user,
        page: action.user === null ? "login" : "home",
        isMenuOpen: false,
      };
    }

    case "toggle-menu": {
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    }

    case "page-change": {
      return {
        ...state,
        page: action.page,
        isMenuOpen: false,
      };
    }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, page, isMenuOpen } = state;

  useEffect(() => {
    initFirebase();

    return auth.onAuthStateChanged((user) => {
      dispatch({ type: "auth-changed", user });
    });
  }, []);

  return (
    <UserProvider value={user}>
      {user !== undefined && (
        <Header
          page={page}
          onPageChange={(page) => {
            dispatch({ type: "page-change", page });
          }}
          isMenuOpen={isMenuOpen}
          onMenuToggle={() => {
            dispatch({ type: "toggle-menu" });
          }}
        />
      )}
      <main className={classNames({ [styles.mainHidden]: isMenuOpen })}>
        {user === undefined ? (
          <div className={styles.initialScreen}>
            <Logo size={96} />
            <h1>Beepy</h1>
          </div>
        ) : page === "login" ? (
          <Login />
        ) : page === "home" ? (
          <Home />
        ) : page === "history" ? (
          <History />
        ) : null}
      </main>
    </UserProvider>
  );
}

export default App;
