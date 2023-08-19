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
import Color from '../components/Color';

const DataTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.isLoading);
  const [editedProduct, setEditedProduct] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDeleteProduct = (_id) => {
    dispatch(deleteProduct(_id));
  };

  const handleEditProduct = (product) => {
    setEditedProduct({ ...product }); // Create a new object for the edited product
    setIsEditFormOpen(true);
  };

  const handleFormClose = () => {
    setIsEditFormOpen(false);
  };

  const handleUpdateProduct = () => {
    // Create a new array with the updated product
    const updatedProducts = products.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );

    // Dispatch the action to update the Redux state
    dispatch(updateProduct(editedProduct));

    // Update the local state to trigger re-render
    setEditedProduct(null);

    setIsEditFormOpen(false);
  };


  const formattedProducts = products.map((product) => ({
    id: product._id, // Use '_id' as the unique 'id' property for each product
    title: product.title,
    color: product.color,
    // color: <Color setColour = {setColor} colourData ={product?.color} />,
    quantity: product.quantity,
    price: product.price,
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
          {editedProduct && (
            <form className="form-container">
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={editedProduct.title}
                  onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
                />
              </div>
              <div>
                <label>Color:</label>
                <input
                  type="text"
                  value={editedProduct.color}
                  onChange={(e) => setEditedProduct({ ...editedProduct, color: e.target.value })}
                />
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={editedProduct.quantity}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, quantity: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                />
              </div>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={handleUpdateProduct}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataTable;