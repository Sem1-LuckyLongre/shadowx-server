import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const URI = "http://localhost:3000";

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    // Check system preference if no saved theme
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme ? savedTheme === "dark" : prefersDark;
  });
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [user, setUser] = useState("");
  let isLoggedIn = !!token;
  const storeTokenIntoLocalStorage = (serverToken) => {
    localStorage.setItem("Token", serverToken);
  };

  const autherizedToken = `Bearer ${token}`;

  const handleLogoutEvent = () => {
    setToken("");
    localStorage.removeItem("Token");
    // localStorage.removeItem("ProfileImage");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    toast.success("Logout Successfully");
  };
  useEffect(() => {
    // Update document class and local storage when theme changes
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const userAuthentication = async () => {
    if (token) {
      try {
        const response = await fetch(`${URI}/api/auth/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User Data :", data);
          setUser(data);
          // toast.success("Authentication Successfully");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        isLoggedIn,
        storeTokenIntoLocalStorage,
        handleLogoutEvent,
        toggleTheme,
        user,
        setUser,
        URI,
        autherizedToken,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
