import React from "react";

export default function EmptyState({ message, icon }) {
  return (
    <div className="bg-grayb m-4">
      <div
        className={`p-4 rounded-lg w-full h-[200px] bg-white flex flex-col gap-4 items-center justify-center`}
      >
        <div>{icon}</div>
        <div className="text-sm text-graylighttext">{message}</div>
      </div>
    </div>
  );
}
