import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDiscount, deleteProduct, getProducts, updateProduct, updateProductDiscount } from '../features/product/productSlice';
import { ColorBadge, Productcolumns } from '../Datasource';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import '../index.css'
import { SketchPicker } from 'react-color';
import { toast } from "react-toastify";


const DataTable = () => {

  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const isLoading = useSelector((state) => state.product.isLoading);
  const [productData, setEditedProduct] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [isDiscountFormOpen, setIsDiscountFormOpen] = useState(false);
  const [discountValue, setDiscountValue] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState([]);



  
  
  const handleEditProduct = (params) => {
    
    const productData = products.find((product) => product._id === params.id);
    setEditedProduct({ ...productData });
    setIsEditFormOpen(true);
    console.log(productData);
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

  const handleDeleteProduct = (params) => {
    
    try {
      const productData = products.find((product) => product._id === params.id);
      dispatch(deleteProduct(productData))
        .then(() => {
          dispatch(getProducts());
        })
        .catch((error) => {
          toast.error("Error deleting Product", error);
        });
    } catch (error) {
      console.log("Error deleting Product", error);
    }
  };
  
  const openDiscountForm = () => {
    if (selectedProductIds.length === 0) {
      toast.error("Select a Product!");
    } else {
    setIsDiscountFormOpen(true);}
  };
  
  const closeDiscountForm = () => {
    setIsDiscountFormOpen(false);
    setDiscountValue(""); 
  };
  
  const handleDeleteDiscount = () => {
    if (selectedProductIds.length === 0) {
      toast.error("Select a Product!");
    } else {
      dispatch(deleteDiscount(selectedProductIds))
      .then(() => {
        toast.success('Discount removed successfully!');
        dispatch(getProducts());
      })
      .catch((error) => {
        toast.error("Error deleting Discount", error);
      });
  }
};
  
const handleRemoveSize = (index) => {
  setEditedProduct((prevProduct) => ({
    ...prevProduct,
    size: prevProduct.size.filter((_, i) => i !== index),
  }));
};

// Function to add a new empty size
const handleAddSize = () => {
  setEditedProduct((prevProduct) => ({
    ...prevProduct,
    size: [...prevProduct.size, { size: '', quantity: '' }],
  }));
};

  // console.log(selectedProductIds);


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
            onClick={() => handleDeleteProduct(params)}

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
      <div style={{ height: 550, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={(Productcolumns || []).concat(actionColumn)}
          loading={isLoading}
          pagination
          pageSize={10}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          rowHeight={125}
          getRowId={(row ) => row._id}
          onRowSelectionModelChange={(ids) => {
            console.log(ids)
            setSelectedProductIds(ids);
          }}
          className="data-grid"
        />
       <div className="disBtns">
        <button className="btn btn-primary" onClick={() => {
             
             openDiscountForm();
           }}
          >Add Discount</button>
        <button className="btn btn-danger" onClick={handleDeleteDiscount} >Remove Discount</button>
       </div>
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
        <label>Colors:</label>
        <div className="color-picker-container">
          <div className="selected-colors">
            {productData.color.map((color, index) => (
              <div key={index} className="selected-color">
                <ColorBadge color={color} />
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    const updatedColors = productData.color.filter(
                      (_, i) => i !== index
                    );
                    setEditedProduct((prevProduct) => ({
                      ...prevProduct,
                      color: updatedColors,
                    }));
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <SketchPicker
            color={currentColor}
            onChange={(color) => {
              setCurrentColor(color.hex);
            }}
          />
          <button
            className="btn btn-primary"
            onClick={(e) => {e.preventDefault();
              setEditedProduct((prevProduct) => ({
                ...prevProduct,
                color: [...prevProduct.color, currentColor],
              }));
            }}
          >
            Add Color
          </button>
        </div>
      </div>
              <div>
              <label>Size:</label>
                {productData.size.map((size, index) => (
                  <div key={index} className="size-input form-row align-items-center mb-3 ">
                    <div className='display-flex '>
                    <input
                      className='sizeInput'
                      type="text"
                      value={size.size}
                      onChange={(e) =>
                        setEditedProduct((prevProduct) => ({
                          ...prevProduct,
                          size: prevProduct.size.map((item, i) =>
                            i === index
                              ? { ...item, size: e.target.value }
                              : item
                          ),
                        }))
                      }
                    />
                    <input
                      className='quantityInput'
                      type="number"
                      value={size.quantity}
                      onChange={(e) =>
                        setEditedProduct((prevProduct) => ({
                          ...prevProduct,
                          size: prevProduct.size.map((item, i) =>
                            i === index
                              ? { ...item, quantity: e.target.value }
                              : item
                          ),
                        }))
                      }
                      style={{ marginLeft: '1rem' }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveSize(index)}
                      style={{ marginLeft: '1rem' }}
                    >
                      Remove
                    </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddSize}
                >
                  Add Size
                </button>
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
      <Dialog open={isDiscountFormOpen} onClose={closeDiscountForm}>
        <DialogTitle>Add Discount</DialogTitle>
        <DialogContent>
          <form className="form-container">
            <div>
              <label>Discount Value:</label>
              <input
                type="text"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder="in percentage %"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDiscountForm}>Cancel</Button>
          <Button
           onClick={async () => {
             try {
               const discount = parseFloat(discountValue);
               if (isNaN(discount) || discount < 1 || discount > 100) {
                 alert('Invalid discount value. Please enter a number between 1 and 100.');
                 return;
               }             
               await dispatch(updateProductDiscount({ productIds: selectedProductIds, discount }));   
               toast.success('Discount added successfully!');          
               closeDiscountForm();
             } catch (error) {
               console.error('Error adding discount:', error);
             }
           }}
        >
  Add
</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataTable;