import { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineContacts,
  AiOutlineLogin,
} from "react-icons/ai";
import { FaBars, FaCog, FaUser, FaUserPlus } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./common/ThemeToggle";
import NavLink from "./NavLink";
import SettingsDropdown from "./SettingsDropdown";
import MobileMenu from "./MobileMenu";
import { GoProjectSymlink } from "react-icons/go";
import { useTheme } from "../context/ThemeContext";
import Modal from "./common/Modal";
import { FiShield } from "react-icons/fi";
// import { div } from "framer-motion/client";

export const NavBar = ({ Login }) => {
  const [toggle, setToggle] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const location = useLocation();

  // const handleLogoutEvent = () => {
  //   localStorage.removeItem("LoggedIn");
  //   window.location.reload();
  // };
  const { handleLogoutEvent, user, globalProfileImg } = useTheme();
  const [IsAdmin, setIsAdmin] = useState(false);

  // if(user.userData.isAdmin){
  //   const IsAdmin = true
  // }sdsdsdsd
  useEffect(() => {
    if (user) {
      setIsAdmin(user.userData.isAdmin);
    }
  }, [user]);
  const handleDeleteEvent = () => {
    // if (
    //   window.confirm(
    //     "Are you sure you want to delete your account? This action cannot be undone."
    //   )
    // ) {
    //   localStorage.clear();
    //   window.location.assign("/");
    // }
    // alert("jj")
    setDeleteModalOpen(true);
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: AiOutlineHome,
      alwaysVisible: true,
    },
    {
      name: "Contact",
      path: "/Contact",
      icon: AiOutlineContacts,
      alwaysVisible: true,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: GoProjectSymlink,
      alwaysVisible: true,
    },
    {
      name: "Explore",
      path: "/Explore",
      icon: MdExplore,
      alwaysVisible: Login,
    },
    {
      name: "Admin Desk",
      path: "/admin/desk",
      icon: FiShield,
      alwaysVisible: IsAdmin,
    },
  ];

  // Function to check if the link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/80 dark:from-gray-900 dark:to-black shadow-lg border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Logo"
              width="150"
              className="dark:opacity-100 opacity-80 dark:invert-0 invert"
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <div className="p-1 rounded-lg">
              <ThemeToggle />
            </div>
            {Login && (
              <div className="p-1 rounded-lg cursor-pointer">
                <Link to="/LoggedIn/profile">
                  {globalProfileImg === "pofile.png" && <FaUser size={30} />}
                  {!globalProfileImg === "pofile.png" && (
                    <img src={globalProfileImg} alt="" />
                  )}
                </Link>
              </div>
            )}
            {Login && (
              <div className="relative">
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)} // Toggle settings dropdown
                  className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {isSettingsOpen ? (
                    <AiOutlineClose size={24} className="text-red-600" />
                  ) : (
                    <FaCog size={24} />
                  )}
                </button>
                {isSettingsOpen && (
                  <SettingsDropdown
                    handleLogoutEvent={handleLogoutEvent}
                    setToggle={setToggle}
                    handleDeleteEvent={handleDeleteEvent}
                  />
                )}
              </div>
            )}
            <button
              onClick={() => setToggle(!toggle)}
              className="text-gray-700 dark:text-white focus:outline-none"
            >
              {toggle ? (
                <AiOutlineClose
                  size={30}
                  className="text-red-600 bg-black dark:text-red-400"
                />
              ) : (
                <FaBars
                  size={30}
                  className="text-blue-600 dark:text-blue-400"
                />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 items-center">
            {navLinks.map(
              (link, index) =>
                (link.alwaysVisible || (link.name === "Explore" && Login)) && (
                  <NavLink
                    key={index}
                    to={link.path}
                    icon={link.icon}
                    name={link.name}
                    isActive={isActiveLink(link.path)}
                  />
                )
            )}
          </ul>

          {/* Desktop Authentication and Settings */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="p-1 bg-white/10 rounded-lg">
              <ThemeToggle />
            </div>
            {Login && (
              <div className="p-1 rounded-lg cursor-pointer">
                <Link to="/LoggedIn/profile">
                  <FaUser size={25} />
                </Link>
              </div>
            )}
            {Login ? (
              <div className="relative">
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)} // Toggle settings dropdown
                  className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {isSettingsOpen ? (
                    <AiOutlineClose size={24} className="text-red-600" />
                  ) : (
                    <FaCog size={24} />
                  )}
                </button>
                {isSettingsOpen && (
                  <SettingsDropdown
                    handleLogoutEvent={handleLogoutEvent}
                    handleDeleteEvent={handleDeleteEvent}
                  />
                )}
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  to={"/SignUp"}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition w-auto"
                >
                  <FaUserPlus />
                  <span>Sign Up</span>
                </Link>
                <Link
                  to={"/SignIn"}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition w-auto"
                >
                  <AiOutlineLogin />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {toggle && (
          <MobileMenu
            navLinks={navLinks}
            Login={Login}
            toggle={toggle}
            setToggle={setToggle}
            isActiveLink={isActiveLink}
          />
        )}

        {isDeleteModalOpen && (
          <Modal
            isOpen={true}
            message="This feature is coming soon! To delete your account, please contact the developer for assistance."
            onClose={() => setDeleteModalOpen(false)}
          />
        )}
      </nav>
    </header>
  );
};
