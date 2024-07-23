import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useEffect } from "react";
import useStore from "../../zustand/store";

export default function InvalidMyStoreFromMobile() {
  const navigate = useNavigate();
  const getMyStore = useStore((state) => state.getMyStore);
  const storeDetail = useStore((state) => state.storeDetail);

  useEffect(() => {
    const fetchdata = async () => {
      await getMyStore();
    };
    fetchdata();
  }, []);

  return (
    <div className="flex w-full min-h-[800px] justify-center p-16 bg-tertiary">
      <div className="flex flex-col h-fit bg-white p-8 pt-4 rounded-2xl gap-3">
        <div className="flex justify-between pt-4">
          <div className="flex flex-col text-primary font-semibold ">
            <div className="flex text-xl pb-1">
              Your store has been created!
            </div>
            <div className="flex text-sm justify-between leading-normal font-semibold">
              <div className="flex flex-col text-graydarktext">
                <div>Store No. </div>
                <div>Store Name</div>
              </div>
              {storeDetail && (
                <div className="flex flex-col leading-relaxed text-tertiary">
                  <div>: AA42041</div>
                  <div>: {storeDetail.myStoreProfile?.storeName}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-sm leading-relaxed text-graydarktext flex flex-col gap-3 font-semibold">
          Thank you for creating your e-store with Freshie Foodie! Mobile does
          not support the store operating feature at this time. Please operate
          your store on desktop. Necessary information has been sent to your
          email. You can click the link in the email that will direct you to
          access your store's main page.
          <div className="pt-3 flex justify-center">
            <Button onClick={() => navigate("/mystore")}>I understood!</Button>
          </div>
          <div className="flex flex-col items-center gap-1 pt-3">
            <div className="text-sm cursor-pointer underline leading-snug text-primary font-semibold">
              Send the link to my email again
            </div>
            <div
              className="text-sm cursor-pointer leading-snug text-primary font-semibold"
              onClick={() => navigate("/home")}
            >
              &lt;&nbsp;back to buyer’s main page
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
