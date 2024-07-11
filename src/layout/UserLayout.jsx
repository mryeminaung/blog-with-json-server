import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <h1 className="text-lg font-bold">UserLayout will go here...</h1>
      <Outlet />
    </div>
  );
};

export default UserLayout;
