import ReviewCard from "./ReviewCard";

export default function Review() {
  const reviewArray = ["", "", "", ""];
  return (
    <div className="flex flex-col bg-white">
      <div className="mx-6 mt-6 text-primary text-xl">Review from Buyers</div>
      <div>
        {reviewArray.map((review, index) => (
          <ReviewCard review={review} key={index} id={index} />
        ))}
      </div>
    </div>
  );
}
