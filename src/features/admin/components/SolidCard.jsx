export default function SolidCard({ backgroundColor, textColor, amount, cardTitle }) {
  return (
    <div
      className={`w-full h-36 rounded-xl ${backgroundColor} mt-2 flex flex-col justify-center items-center`}
    >
      <div>
        <div className={`text-5xl font-semibold ${textColor}`}>{amount}</div>
        <div className={`text-3xl font-medium ${textColor}`}>{cardTitle}</div>
      </div>
    </div>
  );
}
