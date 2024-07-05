import React from "react";

export default function ErrorCard({ err, onClose }) {
  return (
    <div className="flex flex-col px-4 gap-4 items-center">
      <div>{err}</div>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
}
