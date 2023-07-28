import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAProductCategory, getCategories, updateAProductCategory } from '../features/pcategory/pcategorySlice';
import { Categorycolumns } from '../Datasource.js';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function DataTable() {
  const dispatch = useDispatch();
  const pCategories = useSelector((state) => state.pCategory.pCategories);
  const isLoading = useSelector((state) => state.pCategory.isLoading);

  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false);
  const [categoryData, setCategoryData] = React.useState(null);

  React.useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleDeleteCategory = (_id) => {
    dispatch(deleteAProductCategory(_id));
  };

  const handleEditCategory = (category) => {
    setCategoryData(category);
    setIsEditFormOpen(true);
  };

  const handleUpdateCategory = () => {
    if (categoryData && categoryData.title) {
      dispatch(updateAProductCategory(categoryData));
      setIsEditFormOpen(false);
    } else {
      console.log('CD not found');
    }
  };

  const handleCloseForm = () => {
    setIsEditFormOpen(false);
  };

  const formattedCategories = pCategories.map((category) => ({
    id: category._id,
    ...category,
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
              class="btn btn-success"
              onClick={() => handleEditCategory(params)}
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => handleDeleteCategory(params.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={formattedCategories}
        columns={(Categorycolumns || []).concat(actionColumn)}
        loading={isLoading}
        pagination
        pageSize={5}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      {categoryData && (
        <Dialog open={isEditFormOpen} onClose={handleCloseForm}>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <label>Category Title:</label>
            <input
              type="text"
              value={categoryData.title}
              onChange={(e) => setCategoryData({ ...categoryData, title: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button onClick={handleUpdateCategory}>Update</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
