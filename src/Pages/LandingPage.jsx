import { useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Button from "../components/Button";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      {/* for temporary use */}
      <Header />
      <div>
        <div className="relative">
          <p className="absolute text-darkgreen pt-8 pl-8 text-xl font-semibold">
            <div className="bg-white bg-opacity-70 p-6 rounded-xl">
              " Your go-to platform connecting <br />
              &nbsp;passionate food lovers with
              <br />
              &nbsp;dynamic, rotating sellers. "
            </div>
          </p>
          <img
            src="./src/images/durian-buyer-using-voucher.png"
            alt="landing-page-main-image"
            className="w-full h-96"
          />
        </div>
      </div>

      <div className="relative bg-green-100 h-auto">
        <p className="absolute text-darkgreen pt-10 pl-10 text-2xl font-semibold">
          " Whether you're <br />
          &nbsp;a buyer or a seller "
        </p>
        <img
          src="./src/images/fruits-mobile-pic.png"
          alt="landing-page-main-image"
          className="w-full h-72 pt-12 pl-12 pr-12"
        />
        <div className="pt-7 pl-7 pr-7 flex">
          <div className="bg-white w-full pt-8 h-80 text-vividgreen rounded-xl flex flex-col items-center">
            <div className="font-semibold text-2xl">Advantage for Buyers</div>
            <div className="flex justify-center items-center gap-1 p-4 text-sm">
              <div className="flex flex-col items-center p-2 gap-3">
                <div>
                  <img
                    src="./src/images/advantage-buyer-1.png"
                    alt="advantage-buyer-1"
                    className=""
                  />
                </div>
                <div className="p-2 text-center">
                  Follow your favorite sellers and stay updated with their
                  schedules.
                </div>
              </div>
              <div className="flex flex-col items-center p-2 gap-4">
                <div>
                  <img
                    src="./src/images/advantage-buyer-2.png"
                    alt="advantage-buyer-2"
                    className=""
                  />
                </div>
                <div className="p-2 text-center">
                  Discover unique food sellers in your area.
                </div>
              </div>
              <div className="flex flex-col items-center p-2 gap-4">
                <div>
                  <img
                    src="./src/images/advantage-buyer-3.png"
                    alt="advantage-buyer-3"
                    className=""
                  />
                </div>
                <div className="p-2 text-center">
                  Access exclusive discount vouchers and promotions.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-7 pl-7 pr-7 flex">
          <div className="bg-lightyellow w-full pt-8 h-80  text-tertiary rounded-xl flex flex-col items-center">
            <div className="font-semibold text-2xl">Advantage for Sellers</div>
            <div className="flex justify-center items-center gap-1 p-4 text-sm">
              <div className="flex flex-col items-center p-2 gap-4">
                <div>
                  <img
                    src="./src/images/advantage-seller-1.png"
                    alt="advantage-seller-1"
                    className=""
                  />
                </div>
                <div className="p-2 text-center">
                  Organize and manage your events effortlessly.
                </div>
              </div>
              <div className="flex flex-col items-center p-2 gap-4">
                <div>
                  <img
                    src="./src/images/advantage-seller-2.png"
                    alt="advantage-seller-2"
                    className=""
                  />
                </div>
                <div className="p-2 text-center">
                  Attract more buyers with custom vouchers and promotions.
                </div>
              </div>
              <div className="flex flex-col items-center p-2 gap-4">
                <div>
                  <img
                    src="./src/images/advantage-seller-3.png"
                    alt="advantage-seller-3"
                    className=""
                  />
                </div>
                <div className="p-2 text-center">
                  Gain insights on buyer interest to optimize your stock.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pl-10 pr-10 pt-6 gap-2 font-semibold text-lg">
          <div className="p-2 text-center  text-darkgreen">
            Never miss an event with our easy-to-use event calendar.
          </div>
          <div className="p-2 text-center  text-darkbrown">
            Join Freshie Foodie and elevate your food experience, whether you're
            buying or selling!
          </div>
          <div className="p-3">
            <Button onClick={() => navigate("/home")}>Try using now!</Button>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="underline pb-9 text-sm"
            onClick={() => navigate("/login")}
          >
            If you already have an account
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}
