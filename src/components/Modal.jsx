import { createPortal } from "react-dom";

/* eslint-disable react/prop-types */
const widthMap = {
  small: "max-w-sm",
  mid: "max-w-3xl",
  large: "max-w-5xl",
};

export default function Modal({
  width = "mid",
  title,
  onClose,
  open,
  children,
}) {
  return (
    <>
      {open
        ? createPortal(
            <>
              <div className="fixed inset-0 bg-graydarktext opacity-50 z-40 "></div>
              <div className="fixed inset-0 z-40">
                <div className="flex justify-center items-center min-h-screen ">
                  <div
                    className={`bg-absolutewhite rounded-3xl w-11/12 ${widthMap[width]}`}
                  >
                    <div className="flex justify-between items-start py-4 px-8">
                      <div></div>
                      <div className="pt-4">
                        <p className="text-2xl font-medium text-darkgreen">
                          {title}
                        </p>
                      </div>
                      <button className="font-bold" onClick={onClose}>
                        &#10005;
                      </button>
                    </div>
                    <div className="px-4 pb-4 overflow-y-auto">{children}</div>
                  </div>
                </div>
              </div>
            </>,
            document.getElementById("modal")
          )
        : null}
    </>
  );
}
