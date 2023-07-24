import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../features/cutomers/customerSlice';
import { Usercolumns } from '../Datasource';

export default function DataTable() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);
  const isLoading = useSelector((state) => state.customer.isLoading);

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const formattedCustomers = customers.map((customer) => ({
    id: customer._id,
    ...customer,
  }));

  return (
    <div style={{ height: 640, width: '100%' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 700 }}>Users List</h2>
      <DataGrid
        rows={formattedCustomers}
        columns={Usercolumns}
        loading={isLoading}
        pagination
        pageSize={10}
        pageSizeOptions={[10, 25]}
      />
    </div>
  );
}
