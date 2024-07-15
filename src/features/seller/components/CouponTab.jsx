export default function CouponTab({
  storeName,
  eventName,
  voucherDescription,
  eventStartDate,
  eventEndDate,
  voucherCode,
  voucherImage,
}) {
  return (
    <>
      <div className="flex justify-start items-center gap-4 bg-white p-2 pt-3 pb-4 pl-0 pr-4 rounded-lg">
        <div className="h-24">
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            src={voucherImage}
          />
        </div>

        <div className="flex justify-between">
          <div>
            <div className="flex flex-col pr-5">
              <div className="text-lg text-primary font-semibold">
                {storeName}
              </div>
              <div className="text-base font-semibold text-tertiary">
                {eventName}
              </div>
              <div className="text-xs">{voucherDescription}</div>

              <div>
                <div className="flex text-xs">
                  <strong className="text-tertiary">Validity:&nbsp;</strong>
                  {eventStartDate}
                  <strong className="text-tertiary">&nbsp;until&nbsp;</strong>
                  {eventEndDate}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-bold justify-end">
            <div className="flex text-sm text-tertiary justify-end">Code</div>
            <div className="text-red-500 text-sm">{voucherCode}</div>
          </div>
        </div>
      </div>
    </>
  );
}
