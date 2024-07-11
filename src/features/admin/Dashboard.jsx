import { useEffect } from "react";
import { AdminCalender, UserBreakdownIcon } from "../../icons";
import useStore from "../../zustand/store";
import CardWithBorder from "./components/CardWithBorder";
import CustomBarChart from "./components/CustomBarChart";
import CustomDoughnutChart from "./components/CustomDoughnutChart";
import CustomLineChart from "./components/CustomLineChart";
import SolidCard from "./components/SolidCard";

export default function Dashboard() {
  const adminGetAllUser = useStore((state) => state.adminGetAllUser);
  const adminGetAllEvents = useStore((state) => state.adminGetAllEvents);
  const allUsers = useStore((state) => state.allUsers);
  const allEvents = useStore((state) => state.allEvents);

  useEffect(() => {
    adminGetAllUser();
    adminGetAllEvents();
  }, [adminGetAllUser, adminGetAllEvents]);

  const buyerAndSellerCount = +allUsers.length;
  const buyersCount = +allUsers.filter((user) => user.role === "BUYER").length;
  const storesCount = +allUsers.filter((user) => user.role === "SELLER").length;

  return (
    <div className="flex flex-col gap-8 justify-center items-center m-8">
      <div className="w-full h-[250px] rounded-lg flex flex-row justify-center items-center gap-8">
        <div className="w-full h-full bg-absolutewhite rounded-2xl">
          <div className="text-2xl font-bold mt-4 mb-2 flex justify-center gap-2 text-primary">
            <div className="w-[25px] h-[25px]">
              <UserBreakdownIcon iconColor="fill-primary" />
            </div>
            User Breakdown
          </div>
          <div className="flex flex-row justify-center items-center px-4 gap-4">
            <CardWithBorder
              borderColor="bg-primary"
              backgroundColor="bg-absolutewhite"
              textColor="text-primary"
              amount={buyerAndSellerCount}
              cardTitle="All users"
            />
            <SolidCard
              backgroundColor="bg-primary"
              textColor="text-absolutewhite"
              amount={buyersCount}
              cardTitle="Buyers"
            />
            <SolidCard
              backgroundColor="bg-tertiary"
              textColor="text-absolutewhite"
              amount={storesCount}
              cardTitle="Stores"
            />
          </div>
        </div>
        <div className="w-full h-full bg-verylightyellow rounded-2xl">
          <div className="text-2xl font-bold mt-4 mb-2 flex justify-center gap-2 text-tertiary ">
            <div className="w-[25px] h-[25px]">
              <AdminCalender iconColor="fill-tertiary" />
            </div>
            Event Summary
          </div>
          <div className="flex flex-row justify-center items-center px-4 gap-4">
            <CardWithBorder
              borderColor="bg-tertiary"
              backgroundColor="bg-absolutewhite"
              textColor="text-tertiary"
              amount={allEvents.AllEvents}
              cardTitle="Total Events"
            />
            <SolidCard
              backgroundColor="bg-tertiary"
              textColor="text-absolutewhite"
              amount={allEvents.countIsActiveEvents}
              cardTitle="Upcoming"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[28rem] bg-absolutewhite rounded-2xl flex flex-row justify-center items-center px-7 gap-8">
        <CustomBarChart buyersCount={buyersCount} storesCount={storesCount} />

        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 h-full mx-auto p-6 bg-absolutewhite">
          <CustomDoughnutChart
            buyersCount={buyersCount}
            storesCount={storesCount}
            buyerAndSellerCount={buyerAndSellerCount}
          />
        </div>
      </div>
      <div className="w-full h-[400px] flex justify-center items-center">
        <CustomLineChart />
      </div>
    </div>
  );
}
