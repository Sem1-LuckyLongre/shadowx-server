import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import {Loader} from "./components/Loader.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <Loader /> */}
  </StrictMode>
);
