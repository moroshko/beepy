import React, { useState, useEffect } from "react";
import Header from "./Header";
import Logo from "./Logo";
import Login from "./Login";
import Home from "./Home";
import { UserProvider } from "../hooks/useUser";
import { initFirebase, auth } from "../utils/firebase";
import styles from "./App.module.css";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    initFirebase();

    return auth.onAuthStateChanged(setUser);
  }, []);

  return (
    <UserProvider value={user}>
      {user !== undefined && <Header />}
      <main className={styles.main}>
        {user === undefined ? (
          <div className={styles.initialScreen}>
            <Logo size={96} />
            <h1>Beepy</h1>
          </div>
        ) : user === null ? (
          <Login />
        ) : (
          <Home />
        )}
      </main>
    </UserProvider>
  );
}

export default App;
