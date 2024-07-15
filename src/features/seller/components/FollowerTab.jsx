export default function FollowerTab({
  userProfileImage,
  userDisplayName,
  userFirstName,
  userLastName,
  onClick,
}) {
  return (
    <>
      <div className="flex p-3 pl-4 hover:bg-slate-300" onClick={onClick}>
        <div className="pr-4 xl:w-auto xl:h-auto">
          <img
            src={userProfileImage}
            alt="User Profile Image"
            className="w-16 h-16 xl:w-16 xl:h-16 rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="font-semibold text-primary">{userDisplayName}</div>
          <div className="font-semibold text-sm">
            {userFirstName}&nbsp;
            {userLastName}
          </div>
          <div className="text-xs">This buyer is also a seller!</div>
        </div>
      </div>
    </>
  );
}
