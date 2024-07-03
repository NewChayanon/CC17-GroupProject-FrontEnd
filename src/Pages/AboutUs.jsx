import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default function AboutUs() {
  return (
    <>
      <Header />
      <div className="px-8 pt-10 pb-8 flex flex-col items-center">
        <div className="px-6">
          <div className="text-3xl font-bold text-secondary">About Us</div>
          <div className="text-sm text-gray-700 pb-3">
            Our story that crafted this invention for the Thai society!
          </div>
        </div>

        <div className="flex pb-6 bg-secondary rounded-2xl p-2 justify-center pt-4 flex-col">
          <div className=" h-full w-[350px] flex flex-col gap-3">
            <img
              src="./src/images/aboutus-durian-truck.jpg"
              alt="landing-page-main-image"
              className="w-full h-full pt-6 px-6"
            />
          </div>
          <div className="px-6 pt-5  text-primary">
            <div className="text-2xl font-bold">Our Journey</div>
            <div className="text-base font-semibold">
              from the need of fresh fruits with lower price!
            </div>
            <div className="text-tertiary text-sm pt-2 gap-3">
              <div>
                It began with a simple observation: people love fresh fruits,
                and they love getting a good deal. However, the current systems
                in place weren't serving these desires effectively. Supermarket
                fruits, often transported over long distances and handled
                multiple times, lost their peak freshness and came with high
                price tags. On the other hand, local fruit-truck vendors offered
                fresh and cheaper alternatives, but their unpredictable
                schedules and locations made it hard for buyers to rely on them
                regularly. It became clear that a bridge was needed between
                these buyers and sellers to create a more efficient and
                enjoyable fruit-buying experience.
              </div>
              <div className="py-4">
                The idea for Freshy Foodie was born out of this need. Our team
                envisioned a platform that could harness the strengths of local
                fruit vendors while providing the structure and predictability
                that buyers craved. We aimed to create a space where sellers
                could announce their selling events, complete with detailed
                information about the types of fruits available, prices,
                promotions, dates, and locations. This way, buyers could plan
                their purchases in advance, ensuring they could access fresh
                produce at the best prices without the uncertainty that usually
                accompanies fruit-truck purchases.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
