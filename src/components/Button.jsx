import React from "react";
const bgMap = {
  primary: "bg-primary hover:bg-darkgreen",
  secondary: "bg-secondary hover:opacity-80",
  tertiary: "bg-tertiary hover:bg-darkbrown",
  orange: "bg-orange-500 hover:bg-orange-600",
  ghost: "bg-graybg hover:opacity-80",
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
  large: "w-56",
  xl: "w-80",
  full: "w-full",
};

export default function Button({
  children,
  bg = "primary",
  color = "primary",
  border,
  width = "mid",
  onClick,
  id = 0,
  disabled = false,
}) {
  return (
    <button
      className={`px-1 py-1 rounded-xl ${bgMap[bg]} ${colorMap[color]} ${borderMap[border]} ${widthMap[width]} ${disabled && "btn-disabled"} shadow-sm shadow-neutral-950 hover:scale-95`}
      onClick={onClick}
      id={id}
      type="button"
    >
      {children}
    </button>
  );
}
