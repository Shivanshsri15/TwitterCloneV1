import React from "react";
import HomeScreen from "./HomeScreen";
import FollowingUserPost from "../components/FollowingUserPost";

const FollwingPostsScreen = () => {
  return (
    <HomeScreen>
      <h1 className="text-primary">Followings...</h1>
      <hr />
      <FollowingUserPost />
    </HomeScreen>
  );
};

export default FollwingPostsScreen;
