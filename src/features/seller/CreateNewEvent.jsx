import { useState } from "react";
import Button from "../../components/Button";
import MapPinIconWithBase from "../../icons/MapPinIconWithBase";
import UploadIcon from "../../icons/upload-icon";
import useStore from "../../zustand/store";
import SellerMap from "./map/sellerMap";
import { useEffect } from "react";
import { LocationIcon } from "../../icons";
import { useRef } from "react";

const initialInput = {
  eventImage: "",
  voucherImage: "",
  name: "",
  description: "",
  location: "",
  locationName: "",
  startDate: "",
  endDate: "",
  openTime: "",
  closingTime: "",
  eventItem: "",
  // voucher: "",
};

export default function CreateNewEvent() {
  const addDefaultTime = useStore((state) => state.addDefaultTime);
  const addDefaultDate = useStore((state) => state.addDefaultDate);
  const getCurrentFormattedDate = useStore(
    (state) => state.getCurrentFormattedDate
  );
  const [clickedLocation, setClickedLocation] = useState({
    lat: "Please click location on the map",
    lng: "",
  });
  const [clickMap, setClickMap] = useState(false);
  const [input, setInput] = useState(initialInput);
  const [inputSubmit, setInputSubmit] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);
  const fileEl = useRef();

  const currentDate = getCurrentFormattedDate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "startDate": {
        if (value < currentDate) {
          setInputError({
            ...inputError,
            endDate: "",
            [name]: "cannot set start date before current date",
          });
          return;
        }
        if (value > input.endDate) {
          setInputError({
            ...inputError,
            endDate: "",
            [name]: "cannot set start date after end date",
          });
          return;
        }
        const startDateTime = addDefaultTime(value);
        setInput({ ...input, [name]: value });
        setInputSubmit({ ...inputSubmit, startDate: startDateTime });
        setInputError({ ...inputError, endDate: "", [name]: "" });
        break;
      }

      case "endDate": {
        if (value < currentDate) {
          setInputError({
            ...inputError,
            startDate: "",
            [name]: "cannot set start date before current date",
          });
          return;
        }
        if (value < input.startDate) {
          setInputError({
            ...inputError,
            startDate: "",
            [name]: "cannot set end date before start date",
          });
          return;
        }
        const endDateTime = addDefaultTime(value);
        setInput({ ...input, [name]: value });
        setInputSubmit({ ...inputSubmit, endDate: endDateTime });
        setInputError({ ...inputError, startDate: "", [name]: "" });
        break;
      }

      case "openTime": {
        if (value > input.closingTime) {
          setInputError({
            ...inputError,
            [name]: "cannot set open time after end time",
          });
          return;
        }
        const openTimeWithDate = addDefaultDate(value);
        setInput({ ...input, [name]: value });
        setInputSubmit({
          ...inputSubmit,
          openTime: openTimeWithDate,
          closingTime: addDefaultDate(input.closingTime),
        });
        setInputError({ ...inputError, [name]: "" });
        break;
      }

      case "closingTime": {
        if (value < input.openTime) {
          setInputError({
            ...inputError,
            [name]: "cannot set end time before start time",
          });
          return;
        }
        const closingTimeWithDate = addDefaultDate(value);
        setInput({ ...input, [name]: value });
        setInputSubmit({
          ...inputSubmit,
          closingTime: closingTimeWithDate,
          openTime: addDefaultDate(input.openTime),
        });
        setInputError({ ...inputError, [name]: "" });
        break;
      }

      case "evenItem": {
        break;
      }

      default: {
        setInput({ ...input, [name]: value });
        setInputSubmit({ ...inputSubmit, [name]: value });
        setInputError({ ...inputError, [name]: "" });
        break;
      }
    }
  };

  const handleUploadFile = (e) => {
    if (e.target.files[0]) {
      setInput({ ...input, [e.target.name]: e.target.files[0] });
      setInputSubmit({ ...inputSubmit, [e.target.name]: e.target.files[0] });
    }
  };

  const getImageSrc = () => {
    if (typeof input.eventImage === "string") {
      return input.eventImage;
    } else if (input.eventImage instanceof File) {
      return URL.createObjectURL(input.eventImage);
    }
    return null;
  };

  const handlePin = () => {
    setClickMap(false);
    setTimeout(() => {
      setClickMap(true);
    }, 300);
  };

  useEffect(() => {}, []);

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
            <div className="flex flex-col gap-3">
              <input
                className="p-1 pl-2 font-normal w-96 rounded-md text-sm"
                placeholder="Your event name"
                name="name"
                value={input.name}
                onChange={handleChangeInput}
              />
              <small className="text-red-500">{inputError.name}</small>
            </div>
            <div className="pl-1">Description</div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-3">
                <textarea
                  name="description"
                  className="p-1 pl-2 font-normal w-96 h-40 rounded-md text-sm"
                  placeholder="Your event description"
                  value={input.description}
                  onChange={handleChangeInput}
                />
                <small className="text-red-500">{inputError.description}</small>
              </div>
            </div>

            <div className="flex gap-3 flex-col">
              <div className="pl-1 pt-4">Event Location</div>
              <div className="flex gap-3 items-center">
                <input
                  disabled
                  className="p-1 pl-2 font-normal w-96 rounded-md text-sm"
                  placeholder="Type Google Map URL here!"
                  value={`${clickedLocation?.lat} ${clickedLocation?.lng}`}
                  name="location"
                />
                {/* <div>
                  <MapPinIconWithBase />
                </div> */}
              </div>
            </div>

            <div className="flex gap-3 flex-col">
              <div className="pl-1 pt-4">Event Location Name</div>
              <div className="flex gap-3 items-center">
                <input
                  className="p-1 pl-2 font-normal w-96 rounded-md text-sm"
                  placeholder="Event location name"
                  value={input.locationName}
                  name="locationName"
                />
              </div>
            </div>

            <div className="flex gap-3 flex-col">
              <div className="pl-1 pt-4">Upload Event Cover Photo</div>
            </div>
            <div className="flex flex-col justify-center items-center rounded-xl">
              {/* <div className="bg-white rounded-full w-11 h-11 flex justify-center items-center">
                <UploadIcon />
              </div> */}

              {/* <div className="flex gap-2 text-graydarktext text-sm font-normal">
                <div>Drop your picture here or</div>
                <div className="underline cursor-pointer  text-primary font-semibold">
                  click
                </div>
                <div>to upload.</div>
              </div> */}
              <input
                type="file"
                ref={fileEl}
                className="hidden"
                name="eventImage"
                onChange={handleUploadFile}
              />
              {input.eventImage ? (
                <div
                  onClick={() => fileEl.current.click()}
                  className="w-full h-24 xl:h-40 hover:cursor-pointer"
                >
                  <img
                    className="rounded-lg"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    src={getImageSrc()}
                    alt="Event cover image"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex justify-center border-graydarktext border-opacity-40 border-2 border-dashed rounded-xl">
                  <button
                    onClick={() => fileEl.current.click()}
                    className="group flex flex-col justify-center items-center w-fit h-fit"
                  >
                    <div className="bg-absolutewhite group-hover:bg-graybg w-12 h-12 rounded-full flex justify-center items-center">
                      <UploadIcon />
                    </div>
                    <p className="text-darkgreen underline group-hover:text-darkbrown">
                      Browse
                    </p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-yellow-100 rounded-lg w-96 h-[630px] relative">
          <SellerMap
            setLocationParent={setClickedLocation}
            small={true}
            handlePin={handlePin}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center w-16 h-16 bg-transparent">
            {clickMap && <LocationIcon small={false} iconColor="red" />}
          </div>
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
                name="startDate"
                type="date"
                className="text-graydarktext p-1 px-3 rounded-md"
                value={input.startDate}
                onChange={handleChangeInput}
              />
              <small className="text-red-500">{inputError.startDate}</small>
            </div>
            <div className=" text-graydarktext flex flex-col items-center font-semibold text-lg gap-2">
              End Date
              <input
                name="endDate"
                type="date"
                className="text-graydarktext p-1 px-3 rounded-md"
                value={input.endDate}
                onChange={handleChangeInput}
              />
              <small className="text-red-500">{inputError.endDate}</small>
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
                      name="openTime"
                      type="time"
                      className="text-graydarktext p-1 px-3 rounded-md"
                      value={input.openTime}
                      onChange={handleChangeInput}
                    />
                    <small className="text-red-500">
                      {inputError.openTime}
                    </small>
                  </div>
                  <div className=" text-graydarktext flex flex-col items-center font-semibold text-lg gap-2">
                    End Time
                    <input
                      name="closingTime"
                      type="time"
                      className="text-graydarktext p-1 px-3 rounded-md"
                      value={input.closingTime}
                      onChange={handleChangeInput}
                    />
                    <small className="text-red-500">
                      {inputError.closingTime}
                    </small>
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
        <div className="flex gap-5">
          {/* <input className="p-2 w-full rounded-lg" placeholder="" /> */}

          <div className="w-1/2">
            <select
              name="products"
              id="cars"
              className="p-1 px-2 w-full rounded-lg"
              placeholder=""
            >
              <option value="Monthong Durian">Monthong Durian</option>
            </select>
          </div>
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
          <Button width="xl">Create this event!</Button>
        </div>
      </div>
    </div>
  );
}
