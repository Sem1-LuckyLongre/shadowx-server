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
import { ThemeProvider } from "./context/ThemeContext";
import Explore from "./components/LoggedIn/Explore";
import SelectSubjects from "./components/LoggedIn/Activities/SelectSubjects";
import Activites from "./components/LoggedIn/Activities/Activities";
import AddAssignment from "./components/LoggedIn/Activities/Assignmets/AddAssignments";
import ShowAssignments from "./components/LoggedIn/Activities/Assignmets/ShowAssignments";
import AddPracticals from "./components/LoggedIn/Activities/Practicals/AddPracticals";
import ShowPracticals from "./components/LoggedIn/Activities/Practicals/ShowPracticals";

const App = () => {
  const Registration = localStorage.getItem("Registration");
  const Login = localStorage.getItem("LoggedIn");

  const CheckLogin = () => {
    return !!Login;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout Registration={Registration} Login={Login} />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: CheckLogin() ? (
            <Profile />
          ) : (
            <Welcome Registration={Registration} />
          ),
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
