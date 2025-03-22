import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const URI = "https://shadowx-backend.onrender.com";

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
  const [globalProfileImg, setGlobalProfileImg] = useState("profile.png");
  const [user, setUser] = useState("");
  const [mainLoader, setMainLoader] = useState(false);

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
      setMainLoader(true);
      try {
        const response = await fetch(`${URI}/api/auth/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // console.log("User Data :", data);
          setUser(data);
          setMainLoader(false);
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
        mainLoader,
        setUser,
        URI,
        globalProfileImg,
        setGlobalProfileImg,
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
