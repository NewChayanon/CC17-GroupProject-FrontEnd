import Button from "../components/Button";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default function AboutUs() {
  return (
    <>
      <Header />
      <div className="pl-8 pt-10">
        <div className="pl-6">
          <div className="text-2xl font-bold text-secondary">About Us</div>
          <div className="text-base text-gray-700">
            Our story that crafted this invention for the Thai society!
          </div>
        </div>

        <div className="bg-white w-auto h-full">
          <div className="flex justify-center pt-4">
            <div className="bg-secondary h-72 w-[350px] rounded-2xl p-2 flex flex-col gap-3">
              <img
                src="./src/images/aboutus-durian-truck.jpg"
                alt="landing-page-main-image"
                className="w-full h-72 pt-12 pl-12 pr-12"
              />
              <div className="text-lg text-vividgreen font-semibold">
                Seems like you haven’t logged in to our web-application yet.
                Please log-in and try again.
              </div>
              <div className="p-3 flex justify-center pt-10">
                <Button onClick={() => navigate("/home")}>
                  Try using now!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
