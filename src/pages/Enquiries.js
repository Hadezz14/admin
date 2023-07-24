import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Enquirycolumns } from '../Datasource.js';
import { useDispatch, useSelector } from 'react-redux';
import { getEnquiries } from '../features/enquiry/enquirySlice.js';

export default function DataTable() {
  const dispatch = useDispatch();
  const enquiries = useSelector((state) => state.enquiry.enquiries);
  const isLoading = useSelector((state) => state.enquiry.isLoading);

  React.useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);

  const formattedEnquiries = enquiries.map((enquiry) => ({
    id: enquiry._id,
    ...enquiry,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={formattedEnquiries}
        columns={Enquirycolumns}
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        checkboxSelection
      />
    </div>
  );
}