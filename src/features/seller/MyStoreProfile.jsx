import orangeCover from "../../images/orange-cover-mock.png";
import durianProfileLogo from "../../images/profile-mock-durian-pic.png";
import addImageButton from "../../images/add-image-button.png";
import Button from "../../components/Button";
import { useState } from "react";
import useStore from "../../zustand/store";
import { useEffect } from "react";
import ProductTab from "./components/ProductTab";
import { useRef } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import myStoreApi from "../../apis/my-store";

export default function MyStoreProfile() {
  const initialInput = useStore((state) => state.user);
  // const initialTextArea = useStore((state) => state.getMyStoreInfo);
  const getMyStoreInfo = useStore((state) => state.getMyStoreInfo);
  const storeInfo = useStore((state) => state.storeInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState(initialInput);

  const [textArea, setTextArea] = useState({});
  const [editSellerContent, setEditSellerContent] = useState(getMyStoreInfo);
  const [editStoreContent, setEditStoreContent] = useState(getMyStoreInfo);
  const [allowSaveChange, setAllowSaveChange] = useState(false);
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);

  const fileEl = useRef();
  const coverFileEl = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);

      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result);

      reader.readAsDataURL(file);
    }
  };

  const handleChangeTextArea = (e) => {
    setTextArea({ ...textArea, [e.target.name]: e.target.value });
  };

  const submitChange = async () => {
    try {
      const sendData = {
        storeProfileSellerDescription: textArea.storeProfileSellerDescription,
        storeProfileDescription: textArea.storeProfileDescription,
      };

      console.log(sendData);
      setIsLoading(true);

      const formData = new FormData();
      formData.append(
        "storeProfileSellerDescription",
        textArea.storeProfileSellerDescription
      );
      formData.append(
        "storeProfileDescription",
        textArea.storeProfileDescription
      );

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      console.log(formData);
      const response = await myStoreApi.editStoreDescription(formData);
      console.log(response);
      // setInputError({ ...initialInput });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      const res = await getMyStoreInfo();
      setTextArea({
        storeProfileSellerDescription: res.storeProfileSellerDescription,
        storeProfileDescription: res.storeProfileDescription,
      });
    };
    fetchdata();
  }, []);

  return (
    <>
      {isLoading ? <LoadingSpinner /> : null}
      <div className="relative flex flex-wrap w-full">
        <div className="flex flex-col">
          <div className="flex flex-col w-auto h-auto pb-20">
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
              <div className="absolute z-20 bottom-2 right-2">
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
              <div className="flex justify-end">OOO</div>
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
                  <div className="p-2 text-sm   text-graydarktext rounded-lg w-full h-auto">
                    {textArea.storeProfileSellerDescription}
                  </div>
                ) : (
                  <div>
                    <textarea
                      className="p-2 text-sm text-primary rounded-lg w-full h-28"
                      name="storeProfileSellerDescription"
                      value={textArea.storeProfileSellerDescription}
                      onChange={handleChangeTextArea}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between pb-1 pr-1 pt-2">
                  <div className="text-base font-bold pl-2  text-graydarktext">
                    About {storeInfo.storeProfileName}
                  </div>
                  {editStoreContent ? (
                    <div
                      className="underline cursor-pointer text-sm text-lightgreen hover:text-darkgreen"
                      onClick={() => {
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
                    <div className="p-2 text-sm  text-graydarktext rounded-lg w-full h-auto">
                      {textArea.storeProfileDescription}
                    </div>
                  ) : (
                    <textarea
                      className="p-2 text-sm  text-primary rounded-lg w-full h-28"
                      onChange={handleChangeTextArea}
                      name="storeProfileDescription"
                      value={textArea.storeProfileDescription}
                    />
                  )}
                </div>
              </div>
              {allowSaveChange ? (
                <div className="flex justify-center py-4">
                  <Button>Confirm Change</Button>
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

              {/* {getMyStoreInfo && (
              <div className="flex flex-col pt-3 gap-3">
                {getMyStoreInfo.map((el) => (
                  <ProductTab
                    key={el.products.productId}
                    productImage={el.products.productImage}
                    productName={el.products.productName}
                    productDescription={el.products.productDescription}
                    productPrice={el.products.productPrice}
                    productUnit={el.products.productUnit}
                  />
                ))}
              </div>
            )} */}
              <div className="flex justify-center py-4 pt-7">
                <Button>&nbsp;Add more product&nbsp;</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
