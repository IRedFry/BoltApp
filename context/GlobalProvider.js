import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  const getIsAuthenticated = async () => {
    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + "api/Account/IsAuthenticated"
    )
      .then((response) => {
        response.status === 401 &&
          setUser({ isAuthenticated: false, userName: "", userId: -1 });
        setIsLogged(false);
        return response.json();
      })
      .then(
        (data) => {
          if (
            typeof data != "undefined" &&
            typeof data.userName != "undefined"
          ) {
            setUser({
              isAuthenticated: true,
              userName: data.userName,
              userRole: data.userRole,
              userId: data.userId,
            });
          }
        },
        (error) => {
          console.log("getIsAuthenticated ", error);
        }
      );
  };

  useEffect(() => {
    getIsAuthenticated();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
