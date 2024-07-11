import React from "react";

export default function LoginIcon({ id, fill = true }) {
  return (
    <svg
      width="64px"
      height="64px"
      viewBox="0 0 24 24"
      className={`${fill ? "fill-primary" : "fill-absolutewhite group-hover:fill-graylighticon"}`}
      xmlns="http://www.w3.org/2000/svg"
      id={id}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M14 4L17.5 4C20.5577 4 20.5 8 20.5 12C20.5 16 20.5577 20 17.5 20H14M15 12L3 12M15 12L11 16M15 12L11 8"
          stroke="#000000"
          className={`${fill ? "fill-primary" : "fill-absolutewhite group-hover:fill-graylighticon"}`}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          id={id}
        ></path>{" "}
      </g>
    </svg>
  );
}
