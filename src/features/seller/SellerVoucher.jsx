import { QrcodeIcon, SearchIcon } from "../../icons";

function CouponFullMock() {
  return (
    <div className="bg-white p-10 h-full">
      <div className="shadow-lg flex flex-col bg-graybg items-center rounded-xl relative px-8 py-8 gap-4">
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
            src="https://picsum.photos/id/237/300/200"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-base text-primary font-semibold">
            UserName of Seller
          </div>
          <div className="text-base font-semibold ">
            Halloween Super Discount
          </div>
          <div className="text-xs">selectedEventDetails</div>
          <div className="flex justify-between">
            <div className="text-xs">Validity: StartDate - EndDate</div>
            <div className="text-xs">Code: voucherCode</div>
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

function CouponMock() {
  return (
    <>
      <div className="flex justify-center items-center gap-4 bg-white rounded-lg">
        <div className="h-24 ">
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            src="https://picsum.photos/id/237/300/200"
          />
        </div>

        <div className="flex flex-col pr-5">
          <div className="text-base text-primary font-semibold">Store Name</div>
          <div className="text-base font-semibold text-tertiary">
            Coupon Event Name
          </div>
          <div className="text-xs">
            Coupon Condition Description Description Description Description
          </div>
          <div className="flex justify-between">
            <div className="text-xs">Validity: Start Date - End Date</div>
            <div className="text-xs">Code: AAAAAAA</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SellerVoucher() {
  return (
    <div className="flex">
      <div>
        <form className="flex justify-between items-center gap-2 p-4 pb-0">
          <input
            value=""
            onChange=""
            className="flex w-full bg-white p-1 pl-4 border border-gray-300 rounded-full"
            type="text"
            placeholder="Search Coupon "
          />
          <SearchIcon />
        </form>
        <div className="flex flex-col ">
          <div className="flex p-2 pr-6 text-sm justify-end">
            <div className="font-semibold ">Your store coupon amount:</div>
            <div>&nbsp;11 coupons</div>
          </div>
          <div className=" flex flex-col p-4 pt-0 gap-4">
            <CouponMock />
            <CouponMock />
            <CouponMock />
            <CouponMock />
            <CouponMock />
            <CouponMock />
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-10 pb-0 text-center font-semibold text-primary">
          Full Details of Selected Coupon
        </div>
        <CouponFullMock />
      </div>
    </div>
  );
}
