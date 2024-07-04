import Button from "../../components/Button";
import durianProfileLogo from "../../images/profile-mock-durian-pic.png";
import addImageButton from "../../images/add-image-button.png";

function RadioButtons() {
  return (
    <>
      <div className="p-1 rounded-lg">
        <div className="flex justify-around items-center text-xs">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              className="radio-green"
            />
            &nbsp; Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              className="radio-green"
            />
            &nbsp; Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="others"
              className="radio-green"
            />
            &nbsp; Others
          </label>
        </div>
      </div>
    </>
  );
}

export default function UserSettings() {
  return (
    <>
      <div className="p-5 pt-10 flex flex-col items-center">
        <div className="pb-5 relative">
          <img
            src={durianProfileLogo}
            alt="Durian profile mock picture"
            className="w-30 h-30"
          />
        </div>
        <div className="absolute pt-24 pl-28">
          <img
            src={addImageButton}
            alt="Add image button"
            className="w-7 h-7"
          />
        </div>
        <div className="flex">
          <div className=" text-primary font-semibold pt-5 px-2 text-sm w-32 flex flex-col gap-4">
            <div>Display Name</div>
            <div>Real Name</div>
            <div>Store Name</div>
            <div>Email</div>
            <div>Date of Birth</div>
            <div>Mobile</div>
            <div>Gender</div>
            <div>Password</div>
          </div>
          <div className="p-4 text-sm flex flex-col gap-2">
            <div>
              <input
                placeholder="durainlover123"
                className="p-1 pl-2 w-36 rounded-md"
                name=""
              />
              <a className="text-primary text-xs underline font-semibold pl-3">
                Edit
              </a>
            </div>
            <div>
              <input
                placeholder="Somboon Pojjana-aroi"
                className="p-1 pl-2 w-48 rounded-md bg-transparent"
              />
            </div>
            <div className="p-2 text-xs">
              {/* <input
                placeholder="Durian Super Crunchy"
                className="p-1 pl-2 w-48 rounded-md bg-transparent"
              /> */}
              No store yet! <a className="underline text-primary ">Activate</a>{" "}
              the store?
            </div>
            <div>
              <input
                placeholder="myname12@mail.com"
                className="p-1 pl-2 w-48 rounded-md bg-transparent"
              />
            </div>
            <div>
              <input
                type="date"
                className="p-1 pl-2 w-48 rounded-md text-gray-400"
              />
            </div>
            <div>
              <input
                placeholder="088-123-4567"
                className="p-1 pl-2 w-48 rounded-md"
              />
            </div>
            <div>
              <div>
                <RadioButtons
                  name="genderSelection"
                  onChange=""
                  value=""
                  error=""
                />
              </div>
            </div>
            <div>
              <input
                placeholder="●●●●●●●●●"
                className="p-1 pl-2 w-36 rounded-md"
              />
              <a className="text-primary text-xs underline font-semibold pl-3">
                Change
              </a>
            </div>
          </div>
        </div>
        <div></div>
      </div>

      <div className="col-span-2 text-center pb-10">
        <Button>Save Change</Button>
      </div>
    </>
  );
}
