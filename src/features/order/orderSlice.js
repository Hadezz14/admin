import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import orderService from "./orderService";

export const getOrders = createAsyncThunk("order/getallorders", async (thunkAPI) => {
  try {
    return await orderService.getOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createOrder = createAsyncThunk(
  "order/create-order",
  async (orderData, thunkAPI) => {
    try {
      return await orderService.createOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/update-order-status",
  async ({ orderId, status }, thunkAPI) => {
    console.log(status)
    try {
      return await orderService.updateOrderStatus(orderId, status);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetOrderState = createAction("Reset_order");

const initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // Update the order status in the state
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? { ...order, orderStatus: action.payload.orderStatus } : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetOrderState, () => initialState);
  },
});

export default orderSlice.reducer;
