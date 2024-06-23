import LoadingSpinner from "./components/LoadingSpinner";
import Router from "./routes";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Router />
      </Suspense>
    </>
  );
}

export default App;
