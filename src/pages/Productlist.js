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

  const [editedField, setEditedField] = useState({ id: null, field: null });


  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDeleteProduct = (_id) => {
    dispatch(deleteProduct(_id));
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(null); // Clear the selected product
    setEditedField({ id: product._id, field: null }); // Store the ID of the product to be edited
    setIsEditFormOpen(true);
  };

  

  const handleFormClose = () => {
    setIsEditFormOpen(false);
  };
  
  const handleUpdateProduct = () => {
    // Find the product to be updated based on the selected ID
    const updatedProduct = products.find((product) => product._id === editedField.id);

    if (updatedProduct && editedField.field) {
      // Update only the edited field
      updatedProduct[editedField.field] = selectedProduct[editedField.field];
      dispatch(updateProduct(updatedProduct));
    }

    setIsEditFormOpen(false);
    setEditedField({ id: null, field: null }); // Clear the edited field
  };


  const formattedProducts = products.map((product) => ({
    id: product._id,
    title: product.title,
    color: product.color,
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
          {selectedProduct && editedField.id && (
            <form className="form-container">
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={selectedProduct.title}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setEditedField({ ...editedField, field: 'title' })}
                >
                  Save
                </button>
              </div>
              <div>
                <label>Color:</label>
                <input
                  type="text"
                  value={selectedProduct.color}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, color: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setEditedField({ ...editedField, field: 'color' })}
                >
                  Save
                </button>
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={selectedProduct.quantity}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, quantity: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setEditedField({ ...editedField, field: 'quantity' })}
                >
                  Save
                </button>
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setEditedField({ ...editedField, field: 'price' })}
                >
                  Save
                </button>
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