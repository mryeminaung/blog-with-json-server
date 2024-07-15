import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const SocialProfiles = () => {
    const { auth, setAuth } = useAuthContext();
    const [socialProfiles, setSocialProfiles] = useState({
        github: "",
        facebook: "",
    });

    const handleProfiles = (e) => {
        const { name, value } = e.target;
        setSocialProfiles((preProfiles) => ({ ...preProfiles, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(socialProfiles);
        axios.patch(`http://localhost:8000/users/${auth.id}`, {
            ...auth,
            social_profiles: socialProfiles,
        });
        setSocialProfiles({
            github: "",
            facebook: "",
        });
    };

    return (
        <form className="max-w-2xl" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label
                    htmlFor="githubLink"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Github
                </label>
                <input
                    type="url"
                    id="githubLink"
                    name="github"
                    value={socialProfiles.github}
                    onChange={handleProfiles}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="facebookLink"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Facebook
                </label>
                <input
                    type="url"
                    id="facebookLink"
                    name="facebook"
                    value={socialProfiles.facebook}
                    onChange={handleProfiles}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Update
                </button>
            </div>
        </form>
    );
};

export default SocialProfiles;
