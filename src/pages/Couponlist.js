import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Couponcolumns } from '../Datasource';
import { deleteACoupon, getAllCoupon } from '../features/coupon/couponSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DataTable() {
  const dispatch = useDispatch();
  
  const coupons = useSelector((state) => state.coupon.coupons);
  const isLoading = useSelector((state) => state.coupon.isLoading);


  React.useEffect(() => {
    dispatch(getAllCoupon());
  }, [dispatch]);

  const handleCouponDelete = (_id) => {
    dispatch(deleteACoupon(_id));

  };

  const formattedCoupons = coupons.map((coupon) => ({
    id: coupon._id,
    ...coupon,
  }));


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
              <button type="button" class="btn btn-success">Edit</button>
              <button type="button" class="btn btn-danger"  onClick={() => handleCouponDelete(params.id)}>Delete</button>
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={formattedCoupons}
        columns={(Couponcolumns || []).concat(actionColumn)}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}