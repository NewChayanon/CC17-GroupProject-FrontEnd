import { useNavigate } from "react-router-dom";
// import Button from "../../components/Button";

export default function UserInboxMessage({ selectedMessage, onClose }) {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 w-full">
      <div className="flex justify-center py-5 px-4">
        <div className="flex items-center  flex-col gap-4">
          <div className="border-none rounded-md w-auto px-3 py-2">
            <div className="pb-2 font-semibold">Subject</div>
            <textarea
              className="border-none rounded-md px-3 py-2 text-primary font-semibold h-24"
              placeholder=""
              value={selectedMessage.topic}
            />
          </div>
          <div className="border-none rounded-md px-3 py-2 h-96">
            {/* {selectedMessage.message} */}
            <textarea
              className="border-none rounded-md  px-3 py-2 h-96"
              placeholder=""
              value={selectedMessage.message}
            />
          </div>
          {/* <div className="text-sm flex">
            <Button width="full">
              &nbsp;&nbsp;Send to all buyers who follow your store!&nbsp;&nbsp;
            </Button>
          </div> */}
          {/* <div className="text-xs  w-[400px] ">
            *The message above will be sent to your store followers, buyers who
            are interested in your event and those who collected your store
            coupons.
          </div> */}
          <div
            className="text-primary font-semibold md:hidden xl:hidden cursor-pointer"
            onClick={onClose}
          >
            &lt; Back to the main inbox
          </div>
        </div>
      </div>
    </div>
  );
}
