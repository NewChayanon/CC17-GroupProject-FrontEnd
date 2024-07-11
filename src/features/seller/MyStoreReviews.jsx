import ReviewTab from "./components/ReviewTab";

export default function MyStoreReviews() {
  return (
    <>
      <div className="flex flex-col p-8 bg-graybg w-full gap-4">
        <div className="text-primary font-bold text-2xl">
          Review from Buyers
        </div>
        <ReviewTab />
        <ReviewTab />
        <ReviewTab />
        <ReviewTab />
        <ReviewTab />
        <ReviewTab />
      </div>
    </>
  );
}
