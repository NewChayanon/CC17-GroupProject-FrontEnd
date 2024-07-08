import LoadingSpinner from "./components/LoadingSpinner";
import Router from "./routes";
import { Suspense, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY; // Replace with your actual API key
    // loadGoogleMapsAPI(apiKey);
  }, []);

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Router />
        <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      </Suspense>
    </>
  );
}

export default App;
