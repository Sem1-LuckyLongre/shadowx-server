import { Link } from 'react-router-dom';

const NavLink = ({ to, icon: Icon, name, isActive, setToggle }) => {
  return (
    <li onClick={() => setToggle(false)}>
      <Link
        to={to}
        className={`flex items-center space-x-2 transition-colors duration-300 group ${
          isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        }`}
      >
        <Icon className={`text-xl ${isActive ? "text-blue-600 dark:text-blue-400" : "group-hover:text-blue-600 dark:group-hover:text-blue-400"}`} />
        <span>{name}</span>
      </Link>
    </li>
  );
};

export default NavLink;
