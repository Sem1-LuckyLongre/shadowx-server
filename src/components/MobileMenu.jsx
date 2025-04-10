import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import { AiOutlineLogin } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";

const MobileMenu = ({ navLinks, Login, setToggle, isActiveLink }) => {
  return (
    <div className="md:hidden absolute w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800">
      <ul className="px-4 py-6 space-y-4">
        {navLinks.map(
          (link, index) =>
            (link.alwaysVisible || (link.name === "Explore" && Login)) && (
              <NavLink
                key={index}
                to={link.path}
                icon={link.icon}
                name={link.name}
                setToggle={setToggle}
                isActive={isActiveLink(link.path)}
              />
            )
        )}

        {/* Buttons Section */}
        {!Login && (
          <li className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/SignUp"
              onClick={() => setToggle(false)}
              className="flex items-center space-x-3 text-lg py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all w-full md:w-auto"
            >
              <FaUserPlus className="text-xl" />
              <span>Sign Up</span>
            </Link>
            <Link
              to="/SignIn"
              onClick={() => setToggle(false)}
              className="flex items-center space-x-3 text-lg py-2 px-6 bg-gray-800 text-white rounded-lg hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800 transition-all w-full md:w-auto"
            >
              <AiOutlineLogin className="text-xl" />
              <span>Sign In</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
