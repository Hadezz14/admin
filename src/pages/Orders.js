import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { OrderColumn } from '../Datasource';
import { getOrders, updateOrderStatus } from '../features/order/orderSlice';

const DataTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const isLoading = useSelector((state) => state.orders.isLoading);

  React.useEffect(() =>{
    dispatch(getOrders());
  },[])

  
  const formattedOrders = Array.isArray(orders)
    ? orders.map((order) => ({
        id: order._id,
        orderedItems:order.orderedItems.product,
        orderedItems: order.orderedItems.map((item) => item.product.title),
        quantity: order.orderedItems.map((item) => item.quantity),
        firstName: order.shippingInfo.firstName,
        city: order.shippingInfo.city,
        orderStatus: order.OrderStatus,
        createdAt: order.createdAt,
        totalPrice: order.totalPrice,
      }))
    : [];
// console.log(orderedItems)
    const handleUpdateStatus = async (orderId, status) => {
      try {
        await dispatch(updateOrderStatus({ orderId, status }));
        dispatch(getOrders())
      } catch (error) {
        console.log('Error updating order status:', error);
      }
    };
  
    const actionColumn = [
      {
        field: 'action',
        headerName: 'Action',
        width: 200,
        renderCell: (params) => {
          const orderStatus = params.row.orderStatus;
  
          if (orderStatus === 'Pending') {
            return (
              <div className="cellAction">
                <div className="Btn" onClick={() => handleUpdateStatus(params.row.id, "Dispatched")}>
                  Dispatched
                </div>
              </div>
            );
          } else if (orderStatus === 'Dispatched') {
            return (
              <div className="cellAction">
                <div className="btn btn-success" onClick={() => handleUpdateStatus(params.row.id, 'Delivered')}>
                  Delivered
                </div>
                <div className="btn btn-warning" onClick={() => handleUpdateStatus(params.row.id, 'Pending')}>
                  Not Dispatched
                </div>
              </div>
            );
          } else if (orderStatus === 'Delivered') {
            return (
              <div className="cellAction">
                <div className="btn btn-danger" onClick={() => handleUpdateStatus(params.row.id, 'Dispatched')}>
                  Not Delivered
                </div>
                <div className="Btn" onClick={() => handleUpdateStatus(params.row.id, 'Pending')}>
                  Pending
                </div>
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
      />
    </div>
  );
};

export default DataTable;
