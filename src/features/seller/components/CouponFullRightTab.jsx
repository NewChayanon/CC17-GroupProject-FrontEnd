import { QrcodeIcon } from "../../../icons";

export default function CouponFullRightTab({
  storeName = "Store Name",
  eventName = "Event Name",
  voucherCondition = "No conditions",
  voucherDescription = "No description available",
  eventStartDate = "",
  eventEndDate = "",
  voucherCode = "No code",
  voucherImage = "https://picsum.photos/400",
}) {
  const formatDate = (dateString) =>
    dateString ? dateString.split("T")[0] : "N/A";

  const getImageSrc = () => {
    if (typeof voucherImage === "string") {
      return voucherImage;
    } else if (voucherImage instanceof File) {
      return URL.createObjectURL(voucherImage);
    }
    return null;
  };

  return (
    <div className="bg-white h-full w-auto">
      <div className="shadow-lg flex flex-col w-[350px] bg-graybg items-center rounded-xl relative px-8 py-8 gap-4">
        <div
          className="flex items-center"
          style={{ maxHeight: "104px", overflow: "hidden" }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            src={getImageSrc()}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xl text-primary font-semibold">{storeName}</div>
          <div className="text-base text-tertiary font-semibold ">
            {eventName}
          </div>
          <div className="flex flex-col gap-3 py-2">
            <div className="text-xs"> {voucherDescription}</div>
            <div className="text-xs font-semibold">
              <div className="underline">Condition</div>&#42;{voucherCondition}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-xs">
              Validity: {formatDate(eventStartDate)} -{" "}
              {formatDate(eventEndDate)}
            </div>
            <div className="text-xs">Code:&nbsp;{voucherCode}</div>
          </div>
        </div>
        <div className="text-graylighttext font-extrabold">
          &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211;
          &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211; &#8211;
          &#8211; &#8211; &#8211; &#8211; &#8211;
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32">
            <QrcodeIcon />
          </div>
          <div className="text-xs text-graylighttext">
            This QR code is valid until 20 May 2024
          </div>
        </div>
        <div className="absolute bg-white rounded-full w-8 h-8 -left-4 top-1/2 transform -translate-y-1/2"></div>
        <div className="absolute bg-white rounded-full w-8 h-8 -right-4 top-1/2 transform -translate-y-1/2"></div>
      </div>
    </div>
  );
}
