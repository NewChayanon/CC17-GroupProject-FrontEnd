import React from "react";

export default function EventTabCard({ eventDetails }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-xl font-bold">Event: Century Victory Monument</div>
      <div className="flex gap-4 items-center">
        <div
          className="bg-graylighticon rounded-lg flex flex-col justify-center items-center"
          style={{ width: "50px", height: "50px" }}
        >
          <div className="text-sm font-semibold">25</div>
          <div className="text-sm font-semibold text-graylighttext">May</div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-semibold">Thursday</div>
          <div className="text-sm font-semibold text-graylighttext">
            10:00AM - 18:00PM
          </div>
        </div>
      </div>
      <div className="text-sm text-primary font-semibold">
        Location: Century Plaza Victory Monument
      </div>
      <p
        className="text-sm text-graydarktext text-ellipsis overflow-hidden"
        style={{
          minHeight: "80px",
          maxHeight: "80px",
        }}
      >
        Lorem ipsum dolor sit Vivamus cursus elit vel ligula dapibus, vitae
        lacinia tortor consequat. Pellentesque ultrices tristique porttitor.
        Quisque elementum eros sagittis purus efficitur, am Lorem ipsum dolor
        sit Vivamus cursus elit vel ligula dapibus, vitae lacinia tortor
        consequat. Pellentesque ultrices tristique porttitor. Quisque elementum
        eros sagittis purus efficitur, am
      </p>
    </div>
  );
}
