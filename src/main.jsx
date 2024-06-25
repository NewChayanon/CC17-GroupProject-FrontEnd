import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthWrapper from "./features/authentication/AuthWrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <App />
  </AuthWrapper>
);
