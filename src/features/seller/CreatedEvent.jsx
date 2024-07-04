import Button from "../../components/Button";
import eventMapMock from "../../images/event-map-pic-mock.png";

export function EventMock() {
  return (
    <>
      <div className="flex bg-verylightyellow">
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
    </>
  );
}

export default function CreatedEvent() {
  return (
    <>
      <div className="flex flex-wrap w-full bg-graybg">
        <div className="flex flex-col p-9 gap-3 w-full h-auto bg-graybg">
          <div className="flex justify-between px-3">
            <div className="text-primary text-2xl font-bold pb-5">
              Created Event List
            </div>
            <div>
              <Button>Create New Event</Button>
            </div>
          </div>

          <EventMock />
          <EventMock />
          <EventMock />
          <EventMock />

          <EventMock />
          <EventMock />
          <EventMock />
        </div>
      </div>
    </>
  );
}
