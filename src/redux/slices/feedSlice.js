import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeAndUnlikePost } from "./postSlice";

export const getFeedData = createAsyncThunk("user/getFeedData", async () => {
  try {
    const response = await axiosClient.get("/user/getFeedData");
    // console.log(response);
    return response.result;
  } catch (e) {
    return Promise.reject(e);
  }
});

export const followAndUnfollwUser = createAsyncThunk(
  "user/followAndUnfollwUser",
  async (body) => {
    try {
      const response = await axiosClient.post("/user/follow", body);
      // window.location.reload(true);
      return response.result.user;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
        // console.log("like post", post);
        const index = state?.feedData?.posts.findIndex(
          (item) => item._id === post._id
        );
        if (index != undefined && index != -1) {
          state.feedData.posts[index] = post;
        }
      })
      .addCase(followAndUnfollwUser.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state?.feedData?.followings.findIndex(
          (item) => item._id == user._id
        );
        if (index != -1) {
          state?.feedData.followings.splice(index, 1);
        } else {
          state?.feedData.followings.push(user);
        }
      });
  },
});

export default feedSlice.reducer;
