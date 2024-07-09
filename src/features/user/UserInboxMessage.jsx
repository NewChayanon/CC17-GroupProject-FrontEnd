import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function UserInboxMessage() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 xl:w-[450px]">
      <div className="flex justify-center py-5 px-4">
        <div className="flex items-center flex-col gap-4">
          <div>
            <input
              className="border-none rounded-md w-[400px] px-3 py-2"
              placeholder="Subject"
            />
          </div>
          <div>
            <textarea
              className="border-none rounded-md w-[400px] px-3 py-2 h-96"
              placeholder="Type your message here."
            />
          </div>
          <div className="text-sm flex">
            <Button width="full">
              &nbsp;&nbsp;Send to all buyers who follow your store!&nbsp;&nbsp;
            </Button>
          </div>
          <div className="text-xs  w-[400px] ">
            *The message above will be sent to your store followers, buyers who
            are interested in your event and those who collected your store
            coupons.
          </div>
          <div
            className="text-primary font-semibold md:hidden xl:hidden cursor-pointer"
            onClick={() => navigate("/user/inbox")}
          >
            &lt; Back to the main inbox
          </div>
        </div>
      </div>
    </div>
  );
}
