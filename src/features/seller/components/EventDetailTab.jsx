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
};

export default function EventDetailTab({ slideUp }) {
  const selectedEvent = useStore((state) => state.selectedEvent);
  const editEvent = useStore((state) => state.editEvent);
  const fileEl = useRef();

  const [editName, setEditName] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const initialInput = {
    name: selectedEvent.eventName,
    description: selectedEvent.eventDescription,
    eventImage: selectedEvent.eventImage,
  };

  const [input, setInput] = useState(initialInput);
  const [inputSubmit, setInputSubmit] = useState(initialInputError);
  const [inputError, setInputError] = useState(initialInputError);

  useEffect(() => {
    setEditProfile(false);
    setInputError(initialInputError);
    setInputSubmit(initialInputError);
    setInput(initialInput);
  }, [slideUp]);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputSubmit({ ...inputSubmit, [e.target.name]: e.target.value });
    setInputError({ ...inputError, [e.target.name]: "" });
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
      });
      await editEvent(selectedEvent.eventId, formData);
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
          <div className="flex justify-between px-4 py-2 rounded-lg border-absolutewhite border-2 w-full">
            <p className="font-normal text-sm">{input.name}</p>
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
          <div className="flex justify-between px-4 py-2 rounded-lg border-absolutewhite border-2 w-full">
            <p className="font-normal text-sm">{input.description}</p>
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
            className="w-full h-52 hover:cursor-pointer"
          >
            <img
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
        <div className="bg-graybg w-full h-48 rounded-lg border-2 border-graydarktext">
          MAP HERE
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <p>Start Date</p>
        </div>
        <div className="w-1/2">
          <p>End Date</p>
        </div>
      </div>
      <Button onClick={submitEditEvent}>
        <p className="font-bold">Save change</p>
      </Button>
    </div>
  );
}
