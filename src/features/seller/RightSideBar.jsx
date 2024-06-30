const RightSidebar = () => {
  // FOR TEMPORARY USAGE WAIT FOR API
  const socialNetworkIcon = {
    facebook: false,
    instagram: true,
    line: false,
  };
  // FOR TEMPORARY USAGE WAIT FOR API

  return (
    <div className="hidden xl:flex flex-col w-1/4 min-w-[400px] bg-white overflow-y-auto">
      <div className="w-full h-52">
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          src="https://picsum.photos/400"
          alt="store cover image"
        />
      </div>
      <div className="relative pl-32 flex flex-col">
        <div className="absolute w-32 flex flex-col items-center left-0 -top-10 text-center">
          <img
            className="shadow-xl"
            style={{
              height: "96px",
              width: "96px",
              objectFit: "cover",
              display: "block",
              borderRadius: "50%",
            }}
            src="https://picsum.photos/seed/picsum/400/200"
            alt="personal photo"
          />
          <div className="w-full px-2 py-0.5">
            <p className="text-sm text-ellipsis overflow-hidden font-medium text-graydarktext">
              TEST EVENLONGERNAME
            </p>
          </div>
        </div>
        <div className="flex p-2 justify-between items-start">
          <div className="w-3/5 overflow-hidden h-8">
            <p className="text-lg text-ellipsis overflow-hidden font-medium text-darkgreen">
              StoreNameadawdawdwd EVENfweffasdad LONGERRRRRRdwadwd REEEEEEEEE
            </p>
          </div>
          <div className="flex gap-1 pt-1">
            <svg
              className={`w-5 ${socialNetworkIcon.facebook ? "fill-primary" : "fill-graylighticon"}`}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 30 30"
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
            </svg>
            <svg
              className={`w-5 ${socialNetworkIcon.instagram ? "fill-primary" : "fill-graylighticon"}`}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 50 50"
            >
              <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
            </svg>
            <svg
              className={`w-5 ${socialNetworkIcon.line ? "fill-primary" : "fill-graylighticon"}`}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 48 48"
            >
              <path d="M25.12,44.521c-2.114,1.162-2.024-0.549-1.933-1.076c0.054-0.314,0.3-1.787,0.3-1.787c0.07-0.534,0.144-1.36-0.067-1.887 c-0.235-0.58-1.166-0.882-1.85-1.029C11.48,37.415,4.011,30.4,4.011,22.025c0-9.342,9.42-16.943,20.995-16.943S46,12.683,46,22.025 C46,32.517,34.872,39.159,25.12,44.521z M18.369,25.845c0-0.56-0.459-1.015-1.023-1.015h-2.856v-6.678 c0-0.56-0.459-1.015-1.023-1.015c-0.565,0-1.023,0.455-1.023,1.015v7.694c0,0.561,0.459,1.016,1.023,1.016h3.879 C17.91,26.863,18.369,26.406,18.369,25.845z M21.357,18.152c0-0.56-0.459-1.015-1.023-1.015c-0.565,0-1.023,0.455-1.023,1.015 v7.694c0,0.561,0.459,1.016,1.023,1.016c0.565,0,1.023-0.456,1.023-1.016V18.152z M30.697,18.152c0-0.56-0.459-1.015-1.023-1.015 c-0.565,0-1.025,0.455-1.025,1.015v4.761l-3.978-5.369c-0.192-0.254-0.499-0.406-0.818-0.406c-0.11,0-0.219,0.016-0.325,0.052 c-0.419,0.139-0.7,0.526-0.7,0.963v7.694c0,0.561,0.46,1.016,1.025,1.016c0.566,0,1.025-0.456,1.025-1.016v-4.759l3.976,5.369 c0.192,0.254,0.498,0.406,0.818,0.406c0.109,0,0.219-0.018,0.325-0.053c0.42-0.137,0.7-0.524,0.7-0.963V18.152z M36.975,20.984 h-2.856v-1.817h2.856c0.566,0,1.025-0.455,1.025-1.015c0-0.56-0.46-1.015-1.025-1.015h-3.879c-0.565,0-1.023,0.455-1.023,1.015 c0,0.001,0,0.001,0,0.003v3.842v0.001c0,0,0,0,0,0.001v3.845c0,0.561,0.46,1.016,1.023,1.016h3.879 c0.565,0,1.025-0.456,1.025-1.016c0-0.56-0.46-1.015-1.025-1.015h-2.856v-1.817h2.856c0.566,0,1.025-0.455,1.025-1.015 c0-0.561-0.46-1.016-1.025-1.016V20.984z"></path>
            </svg>
          </div>
        </div>
        <div className="px-2 text-xs font-medium text-graydarktext">
          <p>999 followers</p>
          <p>999 events</p>
          <p>999 vouchers</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 p-4">
        <div>
          <p className="text-sm font-bold text-vividgreen">
            Event happening now
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-vividgreen">Upcoming events</p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
