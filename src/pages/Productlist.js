import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, getProducts, updateProduct } from '../features/product/productSlice';
import { Productcolumns } from '../Datasource';
<<<<<<< Updated upstream
=======
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import '../index.css'
>>>>>>> Stashed changes

const DataTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.isLoading);
  const [selectedProduct, setSelectedProduct] = useState(null);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDeleteProduct = (_id) => {
    dispatch(deleteProduct(_id));
  };

<<<<<<< Updated upstream
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
=======
  const handleEditProduct = (params) => {
    const editedProduct = products.find((product) => product._id === params.id);
    console.log(editedProduct)

    setEditedProduct({ ...editedProduct });
    setIsEditFormOpen(true);
>>>>>>> Stashed changes
  };

  const handleFormClose = () => {
    setSelectedProduct(null);
  };

<<<<<<< Updated upstream
  const handleUpdateProduct = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
    handleFormClose();
  };

  const formattedProducts = products.map((product) => ({
    id: product._id,
    ...product,
=======
  const handleUpdateProduct = () => {
    const updatedProducts = products.map((product) =>
      product._id === editedProduct._id ? editedProduct : product
    );
    dispatch(updateProduct());
    setEditedProduct(null);
    setIsEditFormOpen(false);
  };
  const formattedProducts = products.map((product) => ({
    id: product._id, // Use '_id' as the unique 'id' property for each product
    title: product.title,
    color: product.color,
    quantity: product.quantity,
    price: product.price,
>>>>>>> Stashed changes
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
          rows={products}
          columns={(Productcolumns || []).concat(actionColumn)}
          loading={isLoading}
          pagination
          pageSize={5}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
<<<<<<< Updated upstream
      {selectedProduct && (
        <EditProductForm
          product={selectedProduct}
          onClose={handleFormClose}
          onUpdate={handleUpdateProduct}
        />
      )}
=======
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
                  onChange={(e) =>
                    setEditedProduct((prevProduct) => ({
                      ...prevProduct,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label>Color:</label>
                <input
                  type="text"
                  value={editedProduct.color}
                  onChange={(e) =>
                    setEditedProduct((prevProduct) => ({
                      ...prevProduct,
                      color: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={editedProduct.quantity}
                  onChange={(e) =>
                    setEditedProduct((prevProduct) => ({
                      ...prevProduct,
                      quantity: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  value={editedProduct.price}
                  onChange={(e) =>
                    setEditedProduct((prevProduct) => ({
                      ...prevProduct,
                      price: e.target.value,
                    }))
                  }
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
>>>>>>> Stashed changes
    </>
  );
};

<<<<<<< Updated upstream
const EditProductForm = ({ product, onClose, onUpdate }) => {
  const [title, setTitle] = useState(product.title);
  const [color, setColor] = useState(product.color);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);

  const handleUpdateProduct = () => {
    const updatedProduct = {
      id: product.id,
      title,
      color,
      quantity,
      price,
    };
    onUpdate(updatedProduct);
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Color:</label>
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button type="button" onClick={handleUpdateProduct}>
          Update
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

=======
>>>>>>> Stashed changes
export default DataTable;
