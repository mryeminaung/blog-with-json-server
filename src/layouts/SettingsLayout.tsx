import { Outlet } from "react-router-dom";
import SettingMenu from "../components/user/SettingMenu";

const SettingsLayout = () => {
	return (
		<div className="flex items-start gap-x-4 border shadow-md my-5 rounded-lg p-4 py-8 shadow-blue-200">
			<div className="border rounded-md p-5 w-2/6">
				<SettingMenu />
			</div>
			<div className="border rounded-md p-5 w-4/6">
				<Outlet />
			</div>
		</div>
	);
};

export default SettingsLayout;
