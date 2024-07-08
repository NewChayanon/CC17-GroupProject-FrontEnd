import orangeCover from "../../images/orange-cover-mock.png";
import durianProfileLogo from "../../images/profile-mock-durian-pic.png";
import addImageButton from "../../images/add-image-button.png";
import { EditIcon } from "../../icons";
import Button from "../../components/Button";

function ProductMock() {
  return (
    <div className="flex shadow bg-verylightyellow rounded-lg ">
      <div className="bg-yellow-500 h-28 w-36"></div>
      <div className="flex flex-col p-2 pl-3 pr-4">
        <div className="font-semibold">Durian Monthong</div>
        <div className="text-xs">
          Product Description Product Description Product Description Product
          Description
        </div>

        <div className="flex justify-end text-sm font-semibold">
          <div>180 THB</div> <div>/ KG</div>
        </div>
        <div className="flex justify-end text-xs text-primary underline font-semibold">
          edit
        </div>
      </div>
    </div>
  );
}

export default function MyStoreProfile() {
  return (
    <>
      <div className="relative flex flex-wrap flex-col">
        <div className=" flex flex-col w-auto h-auto pb-20">
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
        </div>

        <div className="absolute pt-[257px] pl-[210px] w-full pr-6">
          <div className="flex justify-between w-full">
            <div className="text-primary font-semibold">Lovelove Durian</div>
            <div>OOO</div>
          </div>
          <div className="text-xs pl-2 font-semibold text-gray-500">
            <div className="flex">
              <div>121</div>
              <div>&nbsp;followers</div>
            </div>
            <div className="flex">
              <div>12</div>
              <div>&nbsp;events</div>
            </div>
            <div className="flex">
              <div>11</div>
              <div>&nbsp;coupons</div>
            </div>
          </div>
        </div>
        <div className="p-4 ">
          <div className=" flex flex-col border border-gray-300 rounded-xl p-3">
            <div className="flex justify-between pb-1 pr-1 pt-0">
              <div className="text-base  pl-2 font-bold text-graydarktext">
                About the seller
              </div>
              <div>
                <EditIcon />
              </div>
            </div>
            <div className="text-base text-primary">
              <textarea className="p-2 text-sm rounded-lg w-full">
                About Seller description
              </textarea>
            </div>
            <div>
              <div className="flex justify-between pb-1 pr-1 pt-2">
                <div className="text-base font-bold pl-2 text-graydarktext">
                  Lovelove Durian
                </div>
                <div>
                  <EditIcon />
                </div>
              </div>
              <div className="text-base text-primary">
                <textarea className="p-2 text-sm rounded-lg w-full">
                  About Store description
                </textarea>
              </div>
            </div>
            <div className="flex justify-center py-4">
              <Button>Save Change</Button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-white p-4 flex flex-col">
            <div className="text-primary font-semibold">Featured Products</div>
            <div className="flex flex-col pt-3 gap-3">
              <ProductMock />
              <ProductMock />
              <ProductMock />
            </div>
            <div className="flex justify-center py-4 pt-7">
              <Button>&nbsp;Add more product&nbsp;</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
