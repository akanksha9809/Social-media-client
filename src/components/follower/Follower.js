import React, { useEffect, useState } from "react";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  followAndUnfollwUser,
  getFeedData,
} from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";
import FollowUnfollowBtn from "../followUnfollowBtn/FollowUnfollowBtn";

function Follower({ user }) {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const navigate = useNavigate();

  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    setIsFollowing(feedData.followings.find((item) => item._id === user._id));
  }, [feedData]);

  function handleUserFollow() {
    dispatch(
      followAndUnfollwUser({
        userIdToFollow: user._id,
      })
    );
  }

  return (
    <div className="Follower">
      <div
        className="user-info"
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        <Avatar src={user?.avatar?.url} />
        <h4 className="name">{user?.name}</h4>
      </div>

      <FollowUnfollowBtn
        isFollowing={isFollowing}
        handleUserFollow={handleUserFollow}
      />
    </div>
  );
}

export default Follower;
