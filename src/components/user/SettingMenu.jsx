import { NavLink } from "react-router-dom";

const SettingMenu = () => {
    return (
        <ul>
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <NavLink to="change-password">Password</NavLink>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <NavLink to="social-profiles">Social Links</NavLink>
            </li>
        </ul>
    );
};

export default SettingMenu;
