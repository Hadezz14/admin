import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { orderColumn } from '../Datasource.js';

const rows = [
];

export default function DataTable() {
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
              <div className="editBtn">
                  Completed
              </div>
            <div className="dltBtn" >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={(orderColumn || []).concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 20]}
        checkboxSelection
      />
    </div>
  );
}