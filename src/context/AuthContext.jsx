import React, { createContext, useContext, useEffect, useState } from "react";
import eCommercialServices from "../Services/eCommercialServices";
import { Flex, Spinner } from "@chakra-ui/react";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        console.log(user);
        console.log(loggedIn);
        console.log(loading);
        const data = await eCommercialServices.fetchMe();
        console.log(data);
        setLoggedIn(true);
        setUser(data);
        setLoading(false);
       
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  const login = (data) => {
    setLoggedIn(true);
    setUser(data.user);

    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token", data.refreshToken);
  };

  const logOut = async () => {
    setLoggedIn(false);
    setUser(null);
    const response = await eCommercialServices.logOut();
    console.log(response);
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  };

  const values = {
    login,
    setUser,
    setLoggedIn,
    logOut,
    user,
    loggedIn,
  };
  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          size="xl"
          color="red.500"
        />
      </Flex>
    );
  }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
