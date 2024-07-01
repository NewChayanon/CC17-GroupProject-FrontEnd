import SellerTabCard from "../../components/SellerCard";

export default function SellerSummaryCard({ selectedEventDetails }) {
  return (
    <div className="bg-white p-6 rounded-xl flex flex-col justify-center gap-4">
      <div className="text-xl font-bold">Seller of this event</div>
      <SellerTabCard selectedEventDetails={selectedEventDetails} />
    </div>
  );
}
