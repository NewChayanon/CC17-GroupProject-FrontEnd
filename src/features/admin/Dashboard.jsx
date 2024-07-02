import { BuyerIcon } from "../../icons";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center m-10">
      <div className="w-full h-[250px] bg-green-300 rounded-lg flex flex-row justify-center items-center">
        <div className="w-full h-[210px] mx-5 bg-red-200">
          <div className="text-center text-2xl font-bold mt-2">User Breakdown</div>
        </div>
        <div className="w-full h-[210px] mx-5 bg-purple-200">BBB</div>
      </div>
      <div className="w-full h-[300px] bg-red-300">CCC</div>
      <div className="w-full h-[300px] bg-blue-300">DDD</div>
    </div>
  );
}
