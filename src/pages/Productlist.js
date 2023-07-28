import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, getProducts, updateProduct } from '../features/product/productSlice';
import { Productcolumns } from '../Datasource';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import '../index.css'

const DataTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.isLoading);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDeleteProduct = (_id) => {
    dispatch(deleteProduct(_id));
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditFormOpen(true);
  };

  const handleFormClose = () => {
    setIsEditFormOpen(false);
  };

  const handleUpdateProduct = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
    setIsEditFormOpen(false);
  };

  const formattedProducts = products.map((product) => ({
    id: product._id,
    ...product,
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
              onClick={() => handleEditProduct(params)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDeleteProduct(params.id)}
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
          rows={formattedProducts}
          columns={(Productcolumns || []).concat(actionColumn)}
          loading={isLoading}
          pagination
          pageSize={5}
          checkboxSelection
        />
      </div>
      <Dialog open={isEditFormOpen} onClose={handleFormClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <form>
              <div>
                <label>Title:</label>
                <input type="text" value={selectedProduct.title} onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })} />
              </div>
              <div>
                <label>Color:</label>
                <input type="text" value={selectedProduct.color} onChange={(e) => setSelectedProduct({ ...selectedProduct, color: e.target.value })} />
              </div>
              <div>
                <label>Quantity:</label>
                <input type="number" value={selectedProduct.quantity} onChange={(e) => setSelectedProduct({ ...selectedProduct, quantity: e.target.value })} />
              </div>
              <div>
                <label>Price:</label>
                <input type="number" value={selectedProduct.price} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })} />
              </div>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={() => handleUpdateProduct(selectedProduct)}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataTable;
