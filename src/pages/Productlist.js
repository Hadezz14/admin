import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, getProducts, updateProduct } from '../features/product/productSlice';
import { ColorBadge, Productcolumns } from '../Datasource';
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
  const [productData, setEditedProduct] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [newColor, setNewColor] = useState("");
  
  React.useEffect(() => {
    dispatch(getProducts());
  }, []);
  console.log(products)
  const handleEditProduct = (params) => {
    
    const productData = products.find((product) => product._id === params.id);
    setEditedProduct({ ...productData });
    setIsEditFormOpen(true);
  };

  const handleFormClose = () => {
    setIsEditFormOpen(false);
  };
  const handleUpdateProduct =  () => {
    try {
      dispatch(updateProduct(productData));
      setEditedProduct(null);
      setIsEditFormOpen(false);
      dispatch(getProducts())
      
    } catch (error) {
      console.log('Error updating product:' ,error)
    }
    
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(productData));
  };
  


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
          getRowId={(row ) => row._id}
        />
      </div>
      <Dialog open={isEditFormOpen} onClose={handleFormClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {productData && (
            <form className="form-container">
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={productData.title}
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {productData.color.map((color, index) => (
            <div key={index} style={{ marginRight: '8px' }}>
              <ColorBadge color={color} />
              <button
                type="button"
                onClick={() =>
                  setEditedProduct((prevProduct) => ({
                    ...prevProduct,
                    color: prevProduct.color.filter((_, i) => i !== index),
                  }))
                }
              >
                Remove
              </button>
            </div>
          ))}
          <input
            type="text"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />
          <button
            type="button"
            onClick={() =>
              setEditedProduct((prevProduct) => ({
                ...prevProduct,
                color: [...prevProduct.color, newColor],
              }))
            }
          >
            Add
          </button>
        </div>
      </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={productData.quantity}
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
                  value={productData.price}
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
    </>
  );
};

export default DataTable;