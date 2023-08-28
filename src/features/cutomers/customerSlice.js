import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

export const getUsers = createAsyncThunk(
  "customer/get-customers",
  async (thunkAPI) => {
    try {
      return await customerService.getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const blockUser = createAsyncThunk(
//   "user/blockUser",
//   async (userId, thunkAPI) => {
//     try {
//       return await customerService.blockUser(userId);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const unblockUser = createAsyncThunk(
//   "user/unblockUser",
//   async (userId, thunkAPI) => {
//     try {
//       return await customerService.unblockUser(userId);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const customerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // .addCase(blockUser.pending, (state) => {
      //   state.isBlocking = true;
      //   state.isError = false;
      //   state.isSuccess = false;
      //   state.message = "";
      // })
      // .addCase(blockUser.fulfilled, (state) => {
      //   state.isBlocking = false;
      //   state.isError = false;
      //   state.isSuccess = true;
      //   state.message = "User blocked successfully.";
      // })
      // .addCase(blockUser.rejected, (state, action) => {
      //   state.isBlocking = false;
      //   state.isError = true;
      //   state.isSuccess = false;
      //   state.message = action.error.message || "An error occurred.";
      // })
      // .addCase(unblockUser.pending, (state) => {
      //   state.unblockStatus.isLoading = true;
      //   state.unblockStatus.isSuccess = false;
      //   state.unblockStatus.isError = false;
      //   state.unblockStatus.message = "";
      // })
      // .addCase(unblockUser.fulfilled, (state) => {
      //   state.unblockStatus.isLoading = false;
      //   state.unblockStatus.isSuccess = true;
      //   state.unblockStatus.isError = false;
      //   state.unblockStatus.message = "User unblocked successfully.";
      // })
      // .addCase(unblockUser.rejected, (state, action) => {
      //   state.unblockStatus.isLoading = false;
      //   state.unblockStatus.isSuccess = false;
      //   state.unblockStatus.isError = true;
      //   state.unblockStatus.message = action.error.message || "An error occurred.";
      // });
  },
});
export default customerSlice.reducer;
