import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { orderColumn } from '../Datasource';
import { getOrders } from '../features/order/orderSlice';

const DataTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const isLoading = useSelector((state) => state.orders.isLoading);


  React.useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const formattedOrders = orders.map((order) => ({
    id: order._id,
    ...order,
  }));

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="editBtn">Completed</div>
            <div className="dltBtn">Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={formattedOrders}
        columns={(orderColumn || []).concat(actionColumn)}
        loading={isLoading}
        pageSize={5} 
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
