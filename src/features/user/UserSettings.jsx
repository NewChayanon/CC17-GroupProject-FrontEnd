import Input from "../../components/Input";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";

export default function UserSettings() {
  return (
    <>
      <div>
        <div>Picture</div>
        <div>Display Name</div>
        <div>
          <Input placeholder="user124" />
        </div>
        <div>Real Name</div>
        <div>
          <Input placeholder="Annop Ruangmitpol" />
        </div>
        <div>Store Name</div>
        <div>
          No store yet!{" "}
          <a className="underline text-tertiary font-semibold">Activate</a> the
          store?
        </div>
        <div>
          <input type="datetime-local" />
        </div>
      </div>
    </>
  );
}
