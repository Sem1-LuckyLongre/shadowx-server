import { Welcome } from "./components/Welcome";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Profile } from "./components/LoggedIn/Profile";
import { EditProfile } from "./components/LoggedIn/EditProfile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound";
import AppLayout from "./components/AppLayout";
import { Contact } from "./components/Contact";
import { ForgotPassword } from "./components/ForgotPassword";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Explore from "./components/LoggedIn/Explore";
import SelectSubjects from "./components/LoggedIn/Activities/SelectSubjects";
import Activites from "./components/LoggedIn/Activities/Activities";
import AddAssignment from "./components/LoggedIn/Activities/Assignmets/AddAssignments";
import ShowAssignments from "./components/LoggedIn/Activities/Assignmets/ShowAssignments";
import AddPracticals from "./components/LoggedIn/Activities/Practicals/AddPracticals";
import ShowPracticals from "./components/LoggedIn/Activities/Practicals/ShowPracticals";
import { Projects } from "./components/Projects";
import { AdminLayout } from "./components/layouts/AdminLayout";
import { AdminUsers } from "./components/AdminUsers";
import { AdminWelcome } from "./components/AdminWelcome";
import { AdminMessages } from "./components/AdminMessages";
import { AdminUpdateUser } from "./components/AdminUpdateUser";
import { AdminProjects } from "./components/AdminProjects";
import { useState } from "react";

const App = () => {
  // const Registration = localStorage.getItem("Registration");
  // const Login = localStorage.getItem("LoggedIn");
  const { isLoggedIn } = useTheme();
  const [globalProjects, setGlobalProjects] = useState([]);

  const CheckLogin = () => {
    return !!isLoggedIn;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout Login={isLoggedIn} />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: CheckLogin() ? <Welcome /> : <Welcome />,
        },
        {
          path: "/SignUp",
          element: <SignUp />,
        },
        {
          path: "/SignIn",
          element: <SignIn />,
        },
        {
          path: "/projects",
          element: (
            <Projects
              globalProjects={globalProjects}
              setGlobalProjects={setGlobalProjects}
            />
          ),
        },
        {
          path: "/Contact",
          element: <Contact />,
        },
        {
          path: "/LoggedIn/Profile",
          element: <Profile />,
        },
        {
          path: "/LoggedIn/EditProfile",
          element: <EditProfile />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/Explore",
          element: <Explore />,
        },
        {
          path: "/activities",
          element: <Activites />,
        },
        {
          path: "/addAssignments",
          element: <AddAssignment />,
        },
        {
          path: "/showAssignments",
          element: <ShowAssignments />,
        },
        {
          path: "/addPracticals",
          element: <AddPracticals />,
        },
        {
          path: "/showPracticals",
          element: <ShowPracticals />,
        },
        {
          path: "/SelectSubs",
          element: <SelectSubjects />,
        },
        {
          path: "/admin",
          element: <AdminLayout />,
          children: [
            {
              path: "desk",
              element: <AdminWelcome />,
            },
            {
              path: "users",
              element: <AdminUsers />,
            },
            {
              path: "users/:id/edit",
              element: <AdminUpdateUser />,
            },
            {
              path: "messages",
              element: <AdminMessages />,
            },
            {
              path: "projects",
              element: <AdminProjects />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
