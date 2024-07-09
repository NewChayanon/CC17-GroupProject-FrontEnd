import Button from "../../components/Button";
import { EditIcon } from "../../icons";
import MapPinIconWithBase from "../../icons/MapPinIconWithBase";
import UploadIcon from "../../icons/upload-icon";

export default function CreateNewEvent() {
  return (
    <div className="flex flex-col bg-gray-200">
      <div className="flex p-8 gap-10">
        <div>
          <div className="">
            <div className="text-primary text-2xl font-semibold">
              Event Details
            </div>
          </div>
          <div className="flex flex-col gap-2 text-graydarktext font-semibold">
            <div className="pl-1 pt-4">Event Name</div>
            <div className="flex gap-3 items-center">
              <input
                className="p-1 pl-2 font-normal w-96 rounded-md text-sm"
                placeholder="Your event name"
              />
              <div>
                <EditIcon />
              </div>
            </div>
            <div className="pl-1">Description</div>
            <div className="flex gap-3">
              <div>
                <textarea
                  className="p-1 pl-2 font-normal w-96 h-56 rounded-md text-sm"
                  placeholder="Your event description"
                />
              </div>
              <div>
                <EditIcon />
              </div>
            </div>

            <div className="flex gap-3 flex-col">
              <div className="pl-1 pt-4">Event Location</div>
              <div className="flex gap-3 items-center">
                <input
                  className="p-1 pl-2 font-normal w-96 rounded-md text-sm"
                  placeholder="Type Google Map URL here!"
                />
                <div>
                  <MapPinIconWithBase />
                </div>
              </div>
            </div>

            <div className="flex gap-3 flex-col">
              <div className="pl-1 pt-4">Upload Event Cover Photo</div>
            </div>
            <div className="flex flex-col justify-center items-center border-2 border-dashed border-graydarktext border-opacity-40 p-5 rounded-xl">
              <div className="bg-white rounded-full w-11 h-11 flex justify-center items-center">
                <UploadIcon />
              </div>

              <div className="flex gap-2 text-graydarktext text-sm font-normal">
                <div>Drop your picture here or</div>
                <div className="underline cursor-pointer  text-primary font-semibold">
                  click
                </div>
                <div>to upload.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-yellow-100 rounded-lg w-96 h-[630px]">
          GOOGLE MAP
        </div>
      </div>
      <div className="flex p-8 pt-0 gap-10 ">
        <div className="flex flex-col items-center p-6  w-full bg-yellow-100 rounded-lg h-96">
          <div className="text-primary font-semibold text-2xl pb-2">
            Event Date Time
          </div>
          <div className="bg-yellow-300 w-full rounded-lg flex justify-center gap-36 p-4">
            <div className="text-graydarktext flex flex-col items-center font-semibold text-lg gap-2">
              Start Date
              <input
                type="date"
                className="text-graydarktext p-1 px-3 rounded-md"
              />
            </div>
            <div className=" text-graydarktext flex flex-col items-center font-semibold text-lg gap-2">
              End Date
              <input
                type="date"
                className="text-graydarktext p-1 px-3 rounded-md"
              />
            </div>
          </div>
          <div className="w-full pt-5">
            <div className="border-2 border-dashed border-graydarktext border-opacity-40 p-5 rounded-xl">
              <div className="text-primary font-semibold text-xl">
                Time set-up during event
              </div>
              <div className="text-sm">
                *This time frame will be applicable to all dates of selected
                event duration above.
                <div className="flex gap-36 justify-center pt-3">
                  <div className="text-graydarktext flex flex-col items-center font-semibold text-lg gap-2">
                    Start Time
                    <input
                      type="date"
                      className="text-graydarktext p-1 px-3 rounded-md"
                    />
                  </div>
                  <div className=" text-graydarktext flex flex-col items-center font-semibold text-lg gap-2">
                    End Time
                    <input
                      type="date"
                      className="text-graydarktext p-1 px-3 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-8 pt-0 flex-col gap-1">
        <div className="text-primary font-semibold text-2xl">Products</div>
        <div className="pb-2">
          Select products from your product list registered in "My store"
        </div>
        <div className="flex justify-center gap-5">
          <input className="p-2 w-full rounded-lg" placeholder="" />
          <select
            name="products"
            id="cars"
            className="p-1 px-2 w-full rounded-lg"
            placeholder=""
          >
            <option value="Monthong Durian">Monthong Durian</option>
            <option value="Kanyao Durian">Kanyao Durian</option>
            <option value="Chanee Durian">Chanee Durian</option>
            <option value="Kradum Durian">Kradum Durian</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center items-center bg-verylightyellow p-8 border border-r-0 border-l-0 border-dashed border-tertiary border-opacity-50 flex-col gap-1">
        <button className="py-2 px-8 rounded-lg bg-secondary  w-fit">
          <div className="font-semibold text-tertiary text-base">
            Create a coupon for this event!
          </div>
        </button>
      </div>

      <div className="flex justify-center items-center p-8 flex-col gap-1 text-sm">
        <div>*You can check the detail of coupon in “Store Coupon List.”</div>
        <div>*Once the coupon is created, the content cannot be re-edited.</div>
        <div className="text-lg pt-6">
          <Button width="xl">Create a coupon for this event!</Button>
        </div>
      </div>
    </div>
  );
}
