import orangeCover from "../../images/orange-cover-mock.png";
import durianProfileLogo from "../../images/profile-mock-durian-pic.png";
import addImageButton from "../../images/add-image-button.png";

export default function MyStoreProfile() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="relative flex flex-col w-full h-auto">
          <div className="">
            <img src={orangeCover} alt="orange cover mock" className="w-full" />
          </div>
        </div>
        <div className="absolute p-10 pt-48">
          <img
            src={durianProfileLogo}
            alt="Durian profile mock picture"
            className="w-30 h-30"
          />
        </div>
        <div className="absolute pt-72 pl-36 ">
          <img
            src={addImageButton}
            alt="Add image button"
            className="w-7 h-7"
          />
          <div className="border border-graylighttext rounded">
            <div className="text-lg font-bold text-graydarktext">
              About the seller
            </div>
            <div className="text-base text-primary">
              About Seller description
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-graydarktext">
              Lovelove Durian
            </div>
            <div className="text-base text-primary">
              About Store description
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
