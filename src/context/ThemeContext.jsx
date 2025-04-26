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
  const [globalProjects, setGlobalProjects] = useState([]);
  const [globalProfileImg, setGlobalProfileImg] = useState("profile.png");
  const [user, setUser] = useState("");
  const [mainLoader, setMainLoader] = useState(false);

  let isLoggedIn = !!token;
  const storeTokenIntoLocalStorage = (serverToken) => {
    localStorage.setItem("Token", serverToken);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!user?.userData.ProfileImage) return;
      try {
        const response = await fetch(
          `${URI}/api/upload/profile/${user.userData._id}`
        );
        if (!response.ok) throw new Error("Failed to fetch image");

        const data = await response.json();
        if (data.imageUrl) {
          // setProfileImage(`${data.imageUrl}`);
          setGlobalProfileImg(data.imageUrl);
        }
      } catch (error) {
        toast.error("Error fetching profile image:", error);
      }
    };
    if (user) {
      fetchProfileImage();
    }
  }, [user, globalProfileImg]);

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

        const data = await response.json();
        // console.log(data);

        if (response.ok) {
          // console.log("User Data :", data);
          setUser(data);
          setMainLoader(false);
          // toast.success("Authentication Successfully");
        } else if (data.msg) {
          // toast.error("Please re-login");
          setMainLoader(false);
          setToken("");
        }
      } catch (error) {
        toast.error("Server Error Please Try Again Later...");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]);

  const fetchProjects = async () => {
    try {
      const projectsData = await fetch(`${URI}/api/data/project`);
      const data = await projectsData.json();
      if (projectsData.ok) {
        const sortedProjects = [...data].sort((a, b) => b.id - a.id);
        setGlobalProjects(sortedProjects);
        // console.log(sortedProjects);
      } else {
        toast.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        isLoggedIn,
        storeTokenIntoLocalStorage,
        handleLogoutEvent,
        toggleTheme,
        user,
        globalProjects,
        mainLoader,
        setUser,
        URI,
        userAuthentication,
        globalProfileImg,
        setGlobalProfileImg,
        autherizedToken,
        fetchProjects,
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
