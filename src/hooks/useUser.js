import React, { useContext } from "react";

const UserContext = React.createContext();

export const UserProvider = UserContext.Provider;

function useUser() {
  return useContext(UserContext);
}

export default useUser;
