import orangeCover from "../../images/orange-cover-mock.png";
import durianProfileLogo from "../../images/profile-mock-durian-pic.png";
import addImageButton from "../../images/add-image-button.png";
import Button from "../../components/Button";
import { useState } from "react";
import useStore from "../../zustand/store";
import { useEffect } from "react";
import { useRef } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProductTab from "./components/ProductTab";

const initialInput = {
  description: "",
  sellerDescription: "",
};

import Modal from "../../components/Modal";
import AddMoreProduct from "./AddMoreProduct";

export default function MyStoreProfile() {
  const getMyStoreInfo = useStore((state) => state.getMyStoreInfo);
  const editStoreDescription = useStore((state) => state.editStoreDescription);
  const updateCoverImage = useStore((state) => state.updateCoverImage);
  const updateUserProfileImage = useStore(
    (state) => state.updateUserProfileImage
  );
  const storeInfo = useStore((state) => state.storeInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [textArea, setTextArea] = useState(initialInput);
  const [textAreaError, setTextAreaError] = useState(initialInput);
  const [editSellerContent, setEditSellerContent] = useState(getMyStoreInfo);
  const [editStoreContent, setEditStoreContent] = useState(getMyStoreInfo);
  const [allowSaveChange, setAllowSaveChange] = useState(false);
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  const [open, setOpen] = useState(false);

  const fileEl = useRef();
  const coverFileEl = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);

      reader.readAsDataURL(file);

      setAllowSaveChange(true);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result);

      reader.readAsDataURL(file);

      setAllowSaveChange(true);
    }
  };

  const handleChangeTextArea = (e) => {
    setTextArea({ ...textArea, [e.target.name]: e.target.value });
    setTextAreaError(initialInput);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      if (!textArea.description || !textArea.sellerDescription) {
        if (!textArea.description) {
          setTextAreaError({
            ...textAreaError,
            description: "description cannot be empty",
          });
        }
        if (!textArea.sellerDescription) {
          setTextAreaError({
            ...textAreaError,
            sellerDescription: "seller description cannot be empty",
          });
        }
        return;
      }

      if (coverImageFile) {
        const formData = new FormData();
        formData.append("coverImage", coverImageFile);
        await updateCoverImage(formData);
        setCoverImageFile(null);
      }
      if (imageFile) {
        const formData = new FormData();
        formData.append("userProfileImage", imageFile);
        await updateUserProfileImage(formData);
        setImageFile(null);
      }

      await editStoreDescription(textArea);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      const res = await getMyStoreInfo();
      setTextArea({
        sellerDescription: res.storeProfileSellerDescription,
        description: res.storeProfileDescription,
      });
      setCoverImage(res.storeProfileImage);
      setImage(res.userProfileImage);
    };
    fetchdata();
  }, []);

  return (
    <>
      {isLoading ? <LoadingSpinner /> : null}
      <div className="relative flex flex-wrap w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full h-auto pb-20">
            <div className="h-[160px] sm:h-[264px]">
              <input
                className="hidden"
                type="file"
                ref={coverFileEl}
                onChange={handleCoverImageChange}
              />
              <img
                src={coverImage || orangeCover}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                alt="orange cover mock"
                className="w-full bg-no-repeat flex flex-col justify-center items-center"
              />
              <div className="absolute z-20 top-[8rem] sm:top-[14rem] right-2">
                <img
                  src={addImageButton}
                  alt="Add image button"
                  className="w-7 h-7 cursor-pointer"
                  onClick={() => coverFileEl.current.click()}
                />
              </div>
            </div>
          </div>
          <div className="absolute z-2 p-8 pt-[110px] sm:pt-[200px]">
            <input
              className="hidden"
              type="file"
              ref={fileEl}
              onChange={handleImageChange}
            />
            <img
              src={image || durianProfileLogo}
              alt="Durian profile mock picture"
              className="w-[100px] h-[100px] sm:w-[125px] sm:h-[125px] rounded-full"
            />
          </div>
          <div className="absolute z-10 pt-[180px] pl-[110px] sm:pt-[290px] sm:pl-[130px]">
            <img
              src={addImageButton}
              alt="Add image button"
              className="w-7 h-7 cursor-pointer"
              onClick={() => fileEl.current.click()}
            />
          </div>

          <div className="absolute flex flex-col pt-[165px] pl-[165px] sm:pt-[270px] sm:pl-[190px] pr-6">
            <div className="flex gap-10 ">
              <div className="text-primary font-semibold">
                {storeInfo.storeProfileName}
              </div>
              <div className="flex justify-end">
                <div className="flex gap-1 pt-1"></div>
              </div>
            </div>
            <div className="text-xs pl-2 font-semibold text-gray-500">
              <div className="flex">
                <div> {storeInfo.followers}</div>
                <div>&nbsp;followers</div>
              </div>
              <div className="flex">
                <div> {storeInfo.events}</div>
                <div>&nbsp;events</div>
              </div>
              <div className="flex">
                <div> {storeInfo.vouchers}</div>
                <div>&nbsp;coupons</div>
              </div>
            </div>
          </div>
          <div className="p-4 pt-6 ">
            <div className=" flex flex-col border border-gray-300 rounded-xl p-3">
              <div className="flex justify-between pb-1 pr-1 pt-0">
                <div className="text-base  pl-2 font-bold text-graydarktext">
                  About the seller
                </div>
                {editSellerContent ? (
                  <div
                    className="underline cursor-pointer text-sm text-lightgreen hover:text-darkgreen"
                    onClick={() => {
                      setTextAreaError(initialInput);
                      setEditSellerContent(false);
                      setAllowSaveChange(false);
                    }}
                  >
                    edit
                  </div>
                ) : (
                  <div
                    className="underline cursor-pointer text-sm text-primary"
                    onClick={() => {
                      setEditSellerContent(true);
                      setAllowSaveChange(true);
                    }}
                  >
                    save
                  </div>
                )}
              </div>
              <div className="text-base ">
                {editSellerContent ? (
                  <div className="p-2 rounded-lg w-full h-auto flex flex-col">
                    <p className="text-sm text-graydarktext">
                      {textArea.sellerDescription}
                    </p>
                    {textAreaError.sellerDescription ? (
                      <small className="text-xs text-red-500">
                        {textAreaError.sellerDescription}
                      </small>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    <textarea
                      className="p-2 text-sm text-primary rounded-lg w-full h-28"
                      name="sellerDescription"
                      value={textArea.sellerDescription}
                      onChange={handleChangeTextArea}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between pb-1 pr-1 pt-2">
                  <div className="text-base font-bold pl-2 text-graydarktext">
                    About {storeInfo.storeProfileName}
                  </div>
                  {editStoreContent ? (
                    <div
                      className="underline cursor-pointer text-sm text-lightgreen hover:text-darkgreen"
                      onClick={() => {
                        setTextAreaError(initialInput);
                        setEditStoreContent(false);
                        setAllowSaveChange(false);
                      }}
                    >
                      edit
                    </div>
                  ) : (
                    <div
                      className="underline cursor-pointer text-sm text-primary"
                      onClick={() => {
                        setEditStoreContent(true);
                        setAllowSaveChange(true);
                      }}
                    >
                      save
                    </div>
                  )}
                </div>
                <div className="text-base">
                  {editStoreContent ? (
                    <div className="p-2 rounded-lg w-full h-auto flex flex-col">
                      <p className="text-sm text-graydarktext">
                        {textArea.description}
                      </p>
                      {textAreaError?.description ? (
                        <small className="text-xs text-red-500">
                          {textAreaError.description}
                        </small>
                      ) : null}
                    </div>
                  ) : (
                    <div>
                      <textarea
                        className="p-2 text-sm text-primary rounded-lg w-full overflow-auto h-64"
                        onChange={handleChangeTextArea}
                        name="description"
                        value={textArea.description}
                      />
                    </div>
                  )}
                </div>
              </div>
              {allowSaveChange ? (
                <div className="flex justify-center py-4">
                  <Button onClick={handleSubmit}>Confirm Change</Button>
                </div>
              ) : (
                <div className="flex justify-center py-4">
                  <button
                    className="bg-gray-300 text-gray-100 py-1 px-4 shadow rounded-xl "
                    disabled
                  >
                    Confirm Change
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4">
            <div className="bg-white p-4 flex flex-col">
              <div className="text-primary font-semibold">
                Featured Products
              </div>
              <div className="flex flex-col items-center gap-10 justify-center py-4 pt-7">
                <ProductTab />
                <Button onClick={() => setOpen(true)}>
                  &nbsp;Add more product&nbsp;
                </Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                  <AddMoreProduct onSuccess={() => setOpen(false)} />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
