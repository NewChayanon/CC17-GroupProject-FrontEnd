import Button from "../components/Button";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { useNavigate } from "react-router-dom";

export default function NotLoginPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="bg-secondary w-auto h-full">
        <div className="flex justify-center p-10">
          <div className="bg-white h-72 rounded-2xl p-8 flex flex-col gap-3">
            <div className="text-2xl text-red-500 font-semibold">
              Access Denied!
            </div>
            <div className="text-lg text-vividgreen font-semibold">
              Seems like you haven’t logged in to our web-application yet.
              Please log-in and try again.
            </div>
            <div className="p-3 flex justify-center pt-10">
              <Button onClick={() => navigate("/home")}>Try using now!</Button>
            </div>
          </div>
        </div>
        ;
      </div>
      <Footer />
    </>
  );
}
