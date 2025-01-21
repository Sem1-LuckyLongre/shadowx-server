import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Welcome } from "./components/Welcome";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Profile } from "./components/LoggedIn/Profile";
import { EditProfile } from "./components/LoggedIn/EditProfile";

const App = () => {
  const Registration = localStorage.getItem("Registration");
  const Login = localStorage.getItem("LoggedIn");

  const CheckLogin = () => {
    return !!Login; // Simplified return
  };

  return (
    <Router>
      <div>
        <NavBar Registration={Registration} Login={Login} />
        <Routes>
          <Route
            path="/"
            element={
              CheckLogin() ? (
                <Profile />
              ) : (
                <Welcome Registration={Registration} />
              )
            }
          />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/LoggedIn/Profile" element={<Profile />} />
          <Route path="/LoggedIn/EditProfile" element={<EditProfile />} />
          <Route
            path="*"
            element={<h2 className="text-center my-20">404 Not Found</h2>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;