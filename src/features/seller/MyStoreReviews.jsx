export function ReviewMock() {
  return (
    <>
      <div className="w-full ">
        <div className="flex justify-between w-full">
          <div>"Exceptional Durian Experience!"</div>
          <div>OOOOO</div>
        </div>
        <div className="text-sm p-1">
          I had an amazing experience with khun Thepparin. The durians were
          incredibly fresh and flavorful, straight from the Rayong farm. The
          quality and taste were outstanding. Highly recommend for all durian
          lovers!
        </div>
        <div className="flex justify-between">
          <div className="text-primary font-bold">Supaporn Phantavee</div>{" "}
          <div className="text-graydarktext font-semibold"> coupon used O</div>
        </div>
        <div className="flex text-sm pb-5">
          <div className="text-sm">Reviewed on</div> <div>23 June 2024</div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default function MyStoreReviews() {
  return (
    <>
      <div className="flex flex-col p-8 bg-graybg w-full gap-4">
        <div className="text-primary font-bold text-2xl">
          Review from Buyers
        </div>
        <ReviewMock />
        <ReviewMock />
        <ReviewMock />
        <ReviewMock />
        <ReviewMock />
        <ReviewMock />
      </div>
    </>
  );
}
