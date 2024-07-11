import { StarDisabledIcon, StarIcon } from "../../../icons";

export default function ReviewTab({
  topic,
  rate,
  comment,
  commenterFirstName,
  commenterLastName,
  createdAt,
  isVerify,
}) {
  const starRate = {
    ONE: [1, 0, 0, 0, 0],
    TWO: [1, 1, 0, 0, 0],
    THREE: [1, 1, 1, 0, 0],
    FOUR: [1, 1, 1, 1, 0],
    FIVE: [1, 1, 1, 1, 1],
  };
  const star = starRate[rate];

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between w-full">
          <div className="text-xl font-semibold text-graydarktext">{topic}</div>
          <div className="flex justify-center">
            {star.map((el) => {
              return el === 1 ? <StarIcon /> : <StarDisabledIcon />;
            })}
          </div>
        </div>
        <div className="text-sm pt-2">{comment}</div>
        <div className="flex justify-between">
          <div className="text-primary font-bold pt-3">
            {commenterFirstName} {commenterLastName}
          </div>
        </div>
        <div className="flex text-sm pb-5 justify-between">
          <div>
            <div className="text-sm">
              Reviewed on&nbsp;
              {createdAt.split("T")[0]}
            </div>
          </div>
          {isVerify && (
            <div className="text-graydarktext font-semibold">Coupon Used</div>
          )}
        </div>
        <div className="pb-5">
          <hr />
        </div>
      </div>
    </>
  );
}
