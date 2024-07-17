import ReviewTab from "./components/ReviewTab";
import useStore from "../../zustand/store";
import { useEffect } from "react";

export default function MyStoreReviews() {
  const getMyStoreReviews = useStore((state) => state.getMyStoreReviews);
  const reviewInfo = useStore((state) => state.reviewInfo);

  useEffect(() => {
    const fetchData = async () => {
      await getMyStoreReviews();
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col p-8 bg-graybg w-full gap-4">
        <div className="text-primary font-bold text-2xl">
          Review from Buyers
        </div>
        {reviewInfo && (
          <div>
            {reviewInfo.map((el) => (
              <ReviewTab
                key={el.commentId}
                topic={el.topic}
                rate={el.rate}
                comment={el.comment}
                commenterFirstName={el.commenterFirstName}
                commenterLastName={el.commenterLastName}
                createdAt={el.createdAt}
                isVerify={el.isVerify}
                reviewerImage={el.reviewerImage}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
