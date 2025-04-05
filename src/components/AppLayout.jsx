import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { useTheme } from "../context/ThemeContext";
// import { Loader } from "./Loader";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { MainLoader } from "./MainLoader";

const AppLayout = ({ Login }) => {
  const { isDarkMode, mainLoader } = useTheme();
  const [showButton, setShowButton] = useState(false);
  // console.log("corps allowed");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="flex flex-col min-h-screen bg-[rgb(var(--background))]">
        <NavBar Login={Login} />
        <main className="flex-grow px-4 py-8">
          {mainLoader && <MainLoader />}
          <Outlet />
        </main>
      </div>
      {/* Back to Top Button (Fixed at Bottom-Right) */}
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-blue-400 text-gray-900 p-4 rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:cursor-pointer hover:scale-110 hover:bg-blue-500 hover:shadow-2xl flex items-center justify-center"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <FaArrowUp className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default AppLayout;
