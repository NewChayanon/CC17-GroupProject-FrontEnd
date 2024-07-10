import Button from "./Button";

export default function LogoutModal() {
  return (
    <div className="flex flex-col px-6 pb-4 gap-4 items-center">
      <p className="text-darkgreen font-medium text-lg">
        You are being redirected to Buyer&apos;s main page. Buyer&apos;s page is
        currently not supporting desktop. However, you can still log-in and
        access to the store from the buyer&apos;s mobile layout.
      </p>
      <Button onClick={() => window.location.reload()}>
        <p className="font-medium text-base">I understood!</p>
      </Button>
    </div>
  );
}
