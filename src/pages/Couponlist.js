import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Couponcolumns } from '../Datasource';
import { deleteACoupon, getAllCoupon, updateACoupon } from '../features/coupon/couponSlice';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const DataTable = () => {
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.coupon.coupons);
  const isLoading = useSelector((state) => state.coupon.isLoading);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  React.useEffect(() => {
    dispatch(getAllCoupon());
  }, [dispatch]);

  const handleCouponDelete = (_id) => {
    dispatch(deleteACoupon(_id));
  };

  const handleEditCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setIsEditFormOpen(true);
  };

  const handleUpdateCoupon = () => {
    if (selectedCoupon && (selectedCoupon.name || selectedCoupon.discount || selectedCoupon.expiry)) {
      dispatch(updateACoupon(selectedCoupon));
      setIsEditFormOpen(false);
    } else {
      console.log('Coupon data not found or incomplete');
    }
  };

  const handleCloseForm = () => {
    setIsEditFormOpen(false);
  };

  const formattedCoupons = coupons.map((coupon) => ({
    id: coupon._id,
    ...coupon,
  }));

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => handleEditCoupon(params)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleCouponDelete(params.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
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
      {selectedCoupon && (
        <Dialog open={isEditFormOpen} onClose={handleCloseForm}>
          <DialogTitle>Edit Coupon</DialogTitle>
          <DialogContent>
            <label>Discount Name:</label>
            <input
              type="text"
              value={selectedCoupon.name}
              onChange={(e) => setSelectedCoupon({ ...selectedCoupon, name: e.target.value })}
            />
            <label>Discount Amount:</label>
            <input
              type="number"
              value={selectedCoupon.discount}
              onChange={(e) => setSelectedCoupon({ ...selectedCoupon, discount: e.target.value })}
            />
            <label>Expiry Date:</label>
            <input
              type="date"
              value={selectedCoupon.expiry}
              onChange={(e) => setSelectedCoupon({ ...selectedCoupon, expiry: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>Close</Button>
            <Button onClick={handleUpdateCoupon}>Update</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default DataTable;
