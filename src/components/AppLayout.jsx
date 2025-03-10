import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { useTheme } from "../context/ThemeContext";
import { Loader } from "./Loader";

const AppLayout = ({ Login }) => {
  const { isDarkMode, mainLoader } = useTheme();
  // console.log("corps allowed");
  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="flex flex-col min-h-screen bg-[rgb(var(--background))]">
        <NavBar Login={Login} />
        <main className="flex-grow px-4 py-8">
          {mainLoader && <Loader />}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
