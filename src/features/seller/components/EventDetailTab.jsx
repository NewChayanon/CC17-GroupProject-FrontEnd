import { EditIcon } from "../../../icons";
import MapPinIconWithBase from "../../../icons/MapPinIconWithBase";

export default function EventDetailTab() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between px-4 py-2 rounded-lg border-absolutewhite border-2 w-11/12">
        <div className="w-11/12">
          <p className="font-normal text-xs">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
            magni nesciunt sed consequatur tempora est, dicta repellendus
            expedita voluptates obcaecati numquam itaque inventore. Assumenda
            praesentium esse rem impedit quasi. Error.
          </p>
        </div>
        <EditIcon />
      </div>
      <div className="flex flex-col pt-4 gap-4 w-5/6">
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
    </div>
  );
}
