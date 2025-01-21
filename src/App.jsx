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
          element: CheckLogin() ? <Profile /> : <Welcome Registration={Registration} />,
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
