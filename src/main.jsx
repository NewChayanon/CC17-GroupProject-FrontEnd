import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./redux/store/store.js";
import "./index.css";
import AuthWrapper from "./features/authentication/AuthWrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthWrapper>
      <App />
    </AuthWrapper>
  </Provider>
);
