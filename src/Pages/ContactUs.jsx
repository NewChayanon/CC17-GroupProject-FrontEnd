import Button from "../components/Button";
import Input from "../components/Input";
import { LocationIcon, MobileCall } from "../icons";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default function AboutUs() {
  return (
    <>
      <Header />
      <div className="px-8 py-5 flex flex-col items-center">
        <div className="px-4">
          <div className="text-3xl font-bold text-secondary">Contact Us</div>
          <div className="text-sm text-gray-700 pb-3">
            Any question or remarks? Just write us a message!
          </div>
        </div>

        <div className="flex pb-6 bg-secondary rounded-2xl justify-center p-2 flex-col">
          <div className="px-8 pt-5  text-primary">
            <div className="text-xl font-semibold">Contact Information</div>

            <div className="text-xs font-medium">
              We will get back to you as fast as we can!
            </div>
            <div className="flex gap-5 pt-2">
              <div className="flex flex-col items-center">
                <div className="pl-2 w-6 h-6">
                  <MobileCall />
                </div>
                <LocationIcon iconColor="fill-primary" />
              </div>
              <div className="flex flex-col">
                <div className="text-xs font-medium">+66-88-231-3456</div>
                <div className="text-xs font-medium pb-3">
                  132 Soi.Polo Wireless road Lumphini Pathumwan Bangkok 10330
                  Thailand
                </div>
              </div>
            </div>

            <div className="text-tertiary text-sm pt-2">
              <form className="flex flex-col gap-3">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
                <Input placeholder="Email" />
                <Input placeholder="Mobile Number" />
                <Input placeholder="Subject" />
                <textarea
                  placeholder="  Type your comment here"
                  className="h-48"
                />
                <div className="flex justify-end pt-5 pb-3 ">
                  <Button>Send Message</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
