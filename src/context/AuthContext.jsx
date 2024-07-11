import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(
        JSON.parse(localStorage.getItem("authUser")) || null
    );

    const logIn = (user) => {
        setAuth(user);
    };

    const logOut = () => {
        setAuth(null);
    };

    useEffect(() => {
        localStorage.setItem("authUser", JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, logOut, logIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
