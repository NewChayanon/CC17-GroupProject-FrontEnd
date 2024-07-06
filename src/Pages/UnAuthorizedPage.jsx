import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default function UnAuthorizedPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 justify-center overflow-hidden">
          <div className="flex items-center justify-center">
            <div className="bg-yellow-100 w-[600px] rounded-3xl h-auto p-10 flex flex-col gap-8">
              <div className="text-red-600 text-3xl font-bold">
                Unauthorized to access this page
              </div>
              <div className="text-base">
                Please note that you are not authorized to utilize or access
                features intended exclusively for user interaction. This policy
                is in place to ensure the integrity and privacy of user
                activities and data. If you have any questions or need
                assistance, please contact our support team.
              </div>
              <div className="flex justify-center">
                <Button widthMap="large" onClick={() => navigate("/")}>
                  &nbsp; To main page &nbsp;
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
