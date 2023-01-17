import React from "react";
import "./FollowUnfollowBtn.scss";

function FollowUnfollowBtn({ isFollowing, handleUserFollow }) {
  return (
    <h5
      style={{ marginTop: "10px" }}
      onClick={handleUserFollow}
      className={isFollowing ? "hover-link follow-link" : "btn-primary"}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </h5>
  );
}

export default FollowUnfollowBtn;
