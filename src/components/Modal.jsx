/* eslint-disable react/prop-types */
export default function Modal({ modalID, callToAction, children }) {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn bg-primary text-absolutewhite border-none shadow-md hover:bg-darkgreen"
        onClick={() => document.getElementById(modalID).showModal()}
      >
        {callToAction}
      </button>
      <dialog id={modalID} className="modal">
        <div className="modal-box bg-absolutewhite w-11/12 max-w-5xl">
          {children}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
