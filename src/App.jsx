import LoadingSpinner from "./components/LoadingSpinner";
import Router from "./routes";
import { Suspense, useEffect } from "react";
import loadGoogleMapsAPI from "./features/map/google-loadmap-api";

function App() {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY; // Replace with your actual API key
    // loadGoogleMapsAPI(apiKey);
  }, []);

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Router />
      </Suspense>
    </>
  );
}

export default App;
