import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {
    const { logIn } = useAuthContext();
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleData = (e) => {
        const { name, value } = e.target;
        setData((preData) => ({ ...preData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get("http://localhost:8000/users").then((res) => {
            const authUser = res.data.find(
                (user) =>
                    user.email == data.email && user.password == data.password
            );
            authUser ? logIn(authUser) : navigate("/login");
        });
        setData({
            email: "",
            password: "",
        });
        navigate("/blogs");
    };

    return (
        <form
            action=""
            className="max-w-[500px] mx-auto my-20 border p-4 space-y-3 rounded-md"
            onSubmit={handleSubmit}
            autoComplete="on"
        >
            <h2 className="font-bold text-xl text-center my-4">
                Login to your account
            </h2>

            <div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleData}
                        value={data.email}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleData}
                        value={data.password}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Login;
