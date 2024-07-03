import { useState } from "react";

export default function MyStoreMainPage() {
  const [slideUp, setSlideUp] = useState(false);

  const handleSlideUp = () => {
    setSlideUp(!slideUp);
  };

  return (
    <div className="relative bg-graybg min-h-full flex flex-col justify-between overflow-hidden">
      {/* MAP GOES HERE IN THIS DIV BELOW */}
      <div></div>
      {/* MAP GOES HERE IN THIS DIV ABOVE */}
      <div
        className={`absolute p-4 -bottom-1/2 bg-lightyellow h-5/6 w-full transition-transform duration-500 ${slideUp ? "-translate-y-1/2 overflow-y-auto" : "translate-y-0 overflow-hidden"}`}
      >
        <div className="flex w-full gap-3">
          <div className="flex flex-col w-1/2 gap-2">
            <div>
              <p className="text-base font-bold">
                Event: Century Victory Monument
              </p>
              <p className="text-base font-bold">
                by <span className="text-darkgreen">Lovelove Durian</span>
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col w-12 h-12 rounded-lg items-center justify-center bg-graylighticon">
                <p className="text-absoluteblack text-sm font-bold">12</p>
                <p className="text-graylighttext text-sm font-bold">May</p>
              </div>
              <div>
                <p>Thursday</p>
                <p>10:00AM - 18:00PM</p>
              </div>
            </div>
          </div>
          {/* MAP AND PICTURE GOES HERE IN THIS DIV BELOW */}
          <div className="bg-graybg w-1/2">MAP HERE</div>
          {/* MAP AND PICTURE GOES HERE IN THIS DIV ABOVE */}
        </div>
      </div>
      <button
        className="sticky px-4 py-2 flex bg-transparent justify-end"
        onClick={handleSlideUp}
      >
        <p className="text-darkgreen underline font-semibold text-sm">
          {slideUp ? "Hide full detail" : "View full detail"}
        </p>
      </button>
    </div>
  );
}
