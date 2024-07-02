import React from "react";
const bgMap = {
  primary: "bg-primary hover:bg-darkgreen",
  secondary: "bg-secondary hover:bg-sky-600",
  orange: "bg-orange-500 hover:bg-orange-600",
  ghost: "bg-graybg hover:bg-graylighttext",
};
const colorMap = {
  primary: "text-white",
  secondary: "text-white",
  orange: "text-white",
  ghost: "text-white",
};
const borderMap = {
  primary: "",
  secondary: "",
  orange: "",
  ghost: "",
};
const widthMap = {
  mid: "w-40",
  large: "w-full",
};

export default function Button({
  children,
  bg = "primary",
  color = "primary",
  border,
  width = "mid",
  onClick,
  id = 0,
  disabled = false
}) {
  return (
    <button
      className={`px-2 py-2 rounded-full ${bgMap[bg]} ${colorMap[color]} ${borderMap[border]} ${widthMap[width]} ${disabled&&"btn-disabled"} shadow-sm shadow-neutral-950 hover:scale-95`}
      onClick={onClick}
      id={id}
    >
      {children}
    </button>
  );
}
