import mapMock from "../../images/mapmock-seller.png";
import eventMapMock from "../../images/event-map-pic-mock.png";

export default function MyStoreMainPage() {
  return (
    <>
      <div className="flex flex-col justify-stretch w-full h-auto">
        <div>
          <img
            src={mapMock}
            alt="Map Mock"
            className="w-full h-full bg-verylightyellow"
          />
        </div>
        <div className="flex flex-col justify-stretch w-full hero-overlay pr-5 bg-verylightyellow">
          <div className="flex">
            <div className="p-5 w-full text-sm font-semibold flex flex-col">
              <div className="flex">
                <div>Event : </div>
                <div>&nbsp;Century Victory Monument</div>
              </div>
              <div className="flex">
                <div>by </div>
                <div className="text-primary font-semibold">
                  &nbsp;Lovelove Durian
                </div>
              </div>
              <div className="p-3 flex gap-3">
                <div class="flex flex-col w-12 h-12 rounded-lg items-center justify-center bg-graylighticon">
                  <p class="text-gray-800 text-sm font-bold">12</p>
                  <p class="text-graylighttext text-sm font-bold">May</p>
                </div>
                <div className="flex flex-col justify-center">
                  <div>Thursday</div>
                  <div className="text-xs">10:00AM - 06:00PM</div>
                </div>
              </div>
              <div className="flex text-primary">
                <div>Location: </div>
                <div> &nbsp;Century Plaza Victory Monument</div>
              </div>
            </div>
            <div className="p-6 w-full flex justify-center">
              <div className="flex">
                <img
                  src={eventMapMock}
                  alt="Event Map Mock"
                  className="w-full h-full bg-verylightyellow"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 pr-3 pt-2 flex text-sm justify-end bg-verylightyellow z-10">
          <a className="underline">View full detail</a>
        </div>
      </div>
    </>
  );
}
