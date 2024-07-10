import { useState } from "react";
import { EditIcon } from "../../../icons";
import MapPinIconWithBase from "../../../icons/MapPinIconWithBase";
import useStore from "../../../zustand/store";
import InputTextarea from "../../../components/InputTextarea";
import { useEffect } from "react";
import UploadIcon from "../../../icons/upload-icon";
import { useRef } from "react";
import Button from "../../../components/Button";

const initialInputError = {
  name: "",
  description: "",
  eventImage: "",
  startDate: "",
  endDate: "",
  openTime: "",
  closingTime: "",
};

export default function EventDetailTab({ slideUp }) {
  const selectedEvent = useStore((state) => state.selectedEvent);
  const editEvent = useStore((state) => state.editEvent);
  const addDefaultTime = useStore((state) => state.addDefaultTime);
  const addDefaultDate = useStore((state) => state.addDefaultDate);
  const getMyStore = useStore((state) => state.getMyStore);
  const setSelectedEvent = useStore((state) => state.setSelectedEvent);
  const fileEl = useRef();

  const [editName, setEditName] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const initialInput = {
    name: selectedEvent.eventName,
    description: selectedEvent.eventDescription,
    eventImage: selectedEvent.eventImage,
    startDate: selectedEvent.eventStartDate.split("T")[0],
    endDate: selectedEvent.eventEndDate.split("T")[0],
    openTime: selectedEvent.openTime.split("T")[1].split(":00.000Z")[0],
    closingTime: selectedEvent.closingTime.split("T")[1].split(":00.000Z")[0],
  };

  const [input, setInput] = useState(initialInput);
  const [inputSubmit, setInputSubmit] = useState(initialInputError);
  const [inputError, setInputError] = useState(initialInputError);

  useEffect(() => {
    setEditProfile(false);
    setInputError(initialInputError);
    setInputSubmit(initialInputError);
    setInput(initialInput);
  }, [slideUp, selectedEvent]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "startDate": {
        if (value > input.endDate) {
          setInputError({
            ...inputError,
            [name]: "cannot set start date after end date",
          });
          return;
        }
        const startDateTime = addDefaultTime(value);
        setInput({ ...input, [name]: value });
        setInputSubmit({ ...inputSubmit, startDate: startDateTime });
        setInputError({ ...inputError, [name]: "" });
        break;
      }

      case "endDate": {
        if (value < input.startDate) {
          setInputError({
            ...inputError,
            [name]: "cannot set end date before start date",
          });
          return;
        }
        const endDateTime = addDefaultTime(value);
        setInput({ ...input, [name]: value });
        setInputSubmit({ ...inputSubmit, endDate: endDateTime });
        setInputError({ ...inputError, [name]: "" });
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

  const submitEditEvent = async (e) => {
    try {
      e.preventDefault();
      setInputError(initialInputError);
      const formData = new FormData();
      Object.keys(inputSubmit).forEach((key) => {
        if (inputSubmit[key]) formData.append(key, inputSubmit[key]);
        console.log(inputSubmit[key]);
      });

      const id = { ...selectedEvent };
      await editEvent(id.eventId, formData);
      await getMyStore();
      await setSelectedEvent(id);
      setInputSubmit(initialInputError);
      setEditProfile(false);
    } catch (error) {
      console.error(error);
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

  return (
    <div className="flex flex-col px-6 items-center gap-4">
      <div className="flex flex-col gap-2 w-full">
        <p className="font-medium text-base text-graydarktext">Event Name</p>
        {editName ? (
          <div className="flex gap-2 items-start">
            <InputTextarea
              name="name"
              onChange={handleChangeInput}
              value={input.name}
              error={inputError.name}
              fontSize="sm"
            />
            <button onClick={() => setEditName(!editName)}>
              <EditIcon isGreen={true} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="flex justify-between px-4 py-2 rounded-lg border-absolutewhite border-2 w-full">
              <p className="font-normal text-sm">{input.name}</p>
            </div>
            <button onClick={() => setEditName(!editName)}>
              <EditIcon isGreen={true} />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="font-medium text-base text-graydarktext">Description</p>
        {editProfile ? (
          <div className="flex gap-2 items-start">
            <InputTextarea
              name="description"
              onChange={handleChangeInput}
              value={input.description}
              error={inputError.description}
              fontSize="sm"
            />
            <button onClick={() => setEditProfile(!editProfile)}>
              <EditIcon isGreen={true} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="flex justify-between px-4 py-2 rounded-lg border-absolutewhite border-2 w-full">
              <p className="font-normal text-sm">{input.description}</p>
            </div>
            <button onClick={() => setEditProfile(!editProfile)}>
              <EditIcon isGreen={true} />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <input
          type="file"
          ref={fileEl}
          className="hidden"
          name="eventImage"
          onChange={handleUploadFile}
        />
        <p className="font-medium text-base text-graydarktext">
          Upload Event Cover Photo
        </p>
        {input.eventImage ? (
          <div
            onClick={() => fileEl.current.click()}
            className="w-full h-48 xl:h-56 2xl:h-80 hover:cursor-pointer"
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
          <div className="w-full h-52 flex flex-col justify-center items-center bg-slate-200 border-graylighttext rounded-lg border-2 border-dashed">
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
      <div className="flex flex-col gap-2 w-full">
        <p className="font-medium text-base text-graydarktext">
          Event Location
        </p>
        <div className="flex p-2 bg-absolutewhite justify-between items-center h-12 rounded-lg">
          <input
            className="bg-absolutewhite w-11/12 focus:outline-none"
            placeholder="Type Google Map URL here"
          />
          <button>
            <MapPinIconWithBase />
          </button>
        </div>
        <div className="bg-graybg w-full h-48 xl:h-56 2xl:h-80 rounded-lg border-2 border-graydarktext">
          MAP HERE
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 w-full bg-verylightyellow p-4">
        <p className="text-darkgreen font-bold text-lg">Event Date Time</p>
        <div className="flex w-full">
          <div className="w-1/2 flex justify-center ">
            <div className="flex flex-col">
              <label className="font-medium text-xs" htmlFor="startDate">
                Start Date:
              </label>
              <input
                className="border p-1 text-xs w-40 2xl:w-60 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="date"
                id="startDate"
                name="startDate"
                value={input.startDate}
                onChange={handleChangeInput}
              />
              <small className="text-xs text-red-600">
                {inputError.startDate}
              </small>
            </div>
          </div>
          <div className="w-1/2 flex justify-center">
            <div className="flex flex-col">
              <label className="font-medium text-xs" htmlFor="endDate">
                End Date:
              </label>
              <input
                className="border p-1 text-xs w-40 2xl:w-60 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="date"
                id="endDate"
                name="endDate"
                value={input.endDate}
                onChange={handleChangeInput}
              />
              <small className="text-xs text-red-600">
                {inputError.endDate}
              </small>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 py-2 gap-2 w-4/5 rounded-lg border border-dashed border-primary">
          <p className="text-darkgreen font-medium text-base">
            Time set-up during event
          </p>
          <p className="text-graylighttext text-xs">
            *this time frame will be applicable to the selected duration above
          </p>
          <div className="flex">
            <div className="w-1/2 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-full flex items-center gap-2 justify-evenly">
                  <label
                    className="font-medium text-xs text-graylighttext"
                    htmlFor="openTime"
                  >
                    Start time:
                  </label>
                  <input
                    className="border p-1 text-xs w-32 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    type="time"
                    id="openTime"
                    name="openTime"
                    value={input.openTime}
                    onChange={handleChangeInput}
                  />
                </div>
                <small className="text-xs text-red-600">
                  {inputError.openTime}
                </small>
              </div>
            </div>
            <div className="w-1/2 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-full flex items-center gap-2 justify-evenly">
                  <label
                    className="font-medium text-xs text-graylighttext"
                    htmlFor="closingTime"
                  >
                    End time:
                  </label>
                  <input
                    className="border p-1 text-xs w-32 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    type="time"
                    id="closingTime"
                    name="closingTime"
                    value={input.closingTime}
                    onChange={handleChangeInput}
                  />
                </div>
                <small className="text-xs text-red-600">
                  {inputError.closingTime}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={submitEditEvent}>
        <p className="font-bold">Save change</p>
      </Button>
    </div>
  );
}
