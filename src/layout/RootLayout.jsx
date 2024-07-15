import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-5">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
