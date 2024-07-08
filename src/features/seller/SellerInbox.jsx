import { useState } from "react";
import UserInbox from "../user/UserInbox";
import UserInboxMessage from "../user/UserInboxMessage";

export default function SellerInbox() {
  return (
    <div className="flex items-start justify-start w-full">
      <UserInbox />

      <div className="">
        <UserInboxMessage />
      </div>
    </div>
  );
}
