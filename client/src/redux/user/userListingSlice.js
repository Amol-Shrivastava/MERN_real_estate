import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userListings: null,
  listingError: null,
  listingLoading: null,
};

const userListingSlice = createSlice({
  name: "userListings",
  initialState,
  reducers: {
    getUserListingStart: (state) => {
      state.listingLoading = true;
    },
    getUserListingSuccess: (state, action) => {
      state.userListings = action.payload;
      state.listingLoading = false;
      state.listingError = null;
    },
    getUserListingError: (state, action) => {
      state.listingError = action.payload;
      state.listingLoading = false;
    },
    deleteUserListingStart: (state) => {
      state.listingLoading = true;
    },
    deleteUserListingSuccess: (state, action) => {
      state.userListings = action.payload;
      state.listingLoading = false;
      state.listingError = null;
    },
    deleteUserListingError: (state, action) => {
      state.listingError = action.payload;
      state.listingLoading = false;
    },
  },
});

export const {
  getUserListingStart,
  getUserListingSuccess,
  getUserListingError,
  deleteUserListingStart,
  deleteUserListingSuccess,
  deleteUserListingError,
} = userListingSlice.actions;

export default userListingSlice.reducer;
