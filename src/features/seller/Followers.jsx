import { useEffect } from "react";
import { SearchIcon } from "../../icons";
import useStore from "../../zustand/store";
import FollowerTab from "./components/FollowerTab";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

import SearchBarFilter from "../../components/SearchBarFilter";

export default function Followers() {
  const getMyFollowers = useStore((state) => state.getMyFollowers);
  const followerInfo = useStore((state) => state.followerInfo);
  const setFollowerId = useStore((state) => state.setFollowerId);

  const [followers, setFollowers] = useState([]);
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const [selectedFollowerId, setSelectedFollowerId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1200);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFollowerOnRightTab = (id) => {
    setFollowerId(id);
    setSelectedFollowerId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const follow = await getMyFollowers();
      console.log("follower Info", followerInfo);
      setFollowers(follow);
      setFilteredFollowers(follow);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      console.log(followers);
      const filtered = followers.filter((follower) => {
        const query = debouncedSearchQuery.toLowerCase();

        return (
          follower.userDisplayName.toLowerCase().includes(query) ||
          follower.userFirstName.toLowerCase().includes(query) ||
          follower.userLastName.toLowerCase().includes(query)
        );
      });
      console.log("filtered", filtered);
      setFilteredFollowers(filtered);
    } else {
      setFilteredFollowers(followers);
    }
  }, [debouncedSearchQuery, followers]);

  return (
    <div className="flex flex-col w-full h-auto">
      <div className="flex flex-col gap-2 px-4 py-3">
        <div>
          <SearchBarFilter
            placeholder="Search follower by name"
            handleSearch={handleSearch}
            searchQuery={searchQuery}
          />
        </div>

        <div className="flex text-sm font-semibold pl-2 text-primary ">
          <div>Number of followers :</div> <div>&nbsp;{followers.length}</div>
          <div> &nbsp;users</div>
        </div>
      </div>
      {filteredFollowers && (
        <div>
          {filteredFollowers.map((el) => (
            <FollowerTab
              key={el.userId}
              userProfileImage={el.userProfileImage}
              userDisplayName={el.userDisplayName}
              userFirstName={el.userFirstName}
              userLastName={el.userLastName}
              onClick={() => handleFollowerOnRightTab(el.userId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
