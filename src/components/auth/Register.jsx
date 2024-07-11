import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleData = (e) => {
        const { name, value } = e.target;
        setData((preData) => ({ ...preData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/users", {
            ...data,
            avatar: "https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?w=826&t=st=1720630523~exp=1720631123~hmac=817ae1dfec97a1577e7bfcb487cef7c8394ad0fe92ba776dfa9257798606065a",
        });
        setData({
            username: "",
            email: "",
            password: "",
        });
        navigate("/login");
    };

    return (
        <form
            action=""
            className="max-w-[500px] mx-auto my-20 border p-4 space-y-3 rounded-md"
            onSubmit={handleSubmit}
        >
            <h2 className="font-bold text-xl text-center my-4">
                Sign Up A new Account
            </h2>

            <div>
                <div className="mb-5">
                    <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleData}
                        value={data.username}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                    />
                </div>
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
                <div className="mb-5 hnameden">
                    <label
                        htmlFor="repeat-password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Comfirm password
                    </label>
                    <input
                        type="password"
                        name="repeat-password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Register;
