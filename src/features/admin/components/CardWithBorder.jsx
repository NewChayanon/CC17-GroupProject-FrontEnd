export default function CardWithBorder({
  borderColor,
  backgroundColor,
  textColor,
  amount,
  cardTitle,
}) {
  return (
    <div className={`w-full h-36 rounded-xl ${borderColor} mt-2 flex justify-center items-center`}>
      <div
        className={`w-full h-32 ${backgroundColor} my-4 mx-2 rounded-md flex flex-col justify-center items-center`}
      >
        <div>
          <div className={`text-5xl font-semibold ${textColor}`}>{amount}</div>
          <div className={`text-3xl font-medium ${textColor}`}>{cardTitle}</div>
        </div>
      </div>
    </div>
  );
}
