import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct, getProducts, updateProduct } from '../features/product/productSlice';
import { Productcolumns } from '../Datasource';

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

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleFormClose = () => {
    setSelectedProduct(null);
  };

  const handleUpdateProduct = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
    handleFormClose();
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
      {selectedProduct && (
        <EditProductForm
          product={selectedProduct}
          onClose={handleFormClose}
          onUpdate={handleUpdateProduct}
        />
      )}
    </>
  );
};

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

export default DataTable;
