import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { OrderColumn } from '../Datasource';
import { getOrders, updateOrderStatus } from '../features/order/orderSlice';

const DataTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const isLoading = useSelector((state) => state.orders.isLoading);

  const handleDispatchedClick = async (orderId) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: "Dispatched" }));
    } catch (error) {
      console.error("Error updating order status:", error.message); // Access the error message here
    }
  };
  
  

  // const handleDeliveredClick = async (orderId) => {
  //   try {
  //     await dispatch(updateOrderStatus({ orderId, status: "Delivered" }));
  //   } catch (error) {
  //     console.error("Error updating order status:", error);
  //   }
  // };

  React.useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(getOrders());
    }
  }, [dispatch, orders]);

  const formattedOrders = Array.isArray(orders)
    ? orders.map((order) => ({
        id: order._id,
        firstName: order.shippingInfo.firstName,
        city: order.shippingInfo.city,
        ...order,
      }))
    : [];

    console.log(orders);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const orderStatus = params.row.orderStatus;

        if (orderStatus === "Pending") {
          return (
            <div className="cellAction">
              <div className="Btn" onClick={() => handleDispatchedClick(params.row.id)}>
                Dispatched
              </div>
            </div>
          );
        } else if (orderStatus === "Dispatched") {
          return (
            <div className="cellAction">
              <div className="Btn" onClick={() => handleDeliveredClick(params.row.id)}>
                Delivered
              </div>
            </div>
          );
        } else if (orderStatus === "Delivered") {
          return (
            <div className="cellAction">
              <div className="btn">Not Delivered</div>
            </div>
          );
        } else {
          return null;
        }
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={formattedOrders}
        columns={(OrderColumn || []).concat(actionColumn)}
        loading={isLoading}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
