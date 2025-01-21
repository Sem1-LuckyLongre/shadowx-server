import React from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';

const MobileMenu = ({ navLinks, Login, toggle, setToggle, isActiveLink }) => {
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
                isActive={isActiveLink(link.path)}
                onClick={() => setToggle(false)}
              />
            )
        )}
        {!Login && (
          <li>
            <Link
              to="/SignUp"
              onClick={() => setToggle(false)}
              className="flex items-center space-x-3 text-lg py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              <AiOutlineLogin className="text-2xl" />
              <span>Sign Up</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
