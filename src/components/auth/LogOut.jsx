import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const { logOut } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        logOut();
        navigate("/blogs");
    }, []);

    return null;
};

export default LogOut;
