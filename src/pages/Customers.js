import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getUsers} from "../features/cutomers/customerSlice";
import { Usercolumns } from "../Datasource";
import { blockUser, deleteUser, unblockUser } from "../features/auth/authSlice";

export default function DataTable() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);
  const isLoading = useSelector((state) => state.customer.isLoading);

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDeleteUser = async(userId) =>{
    try{
      await dispatch(deleteUser(userId));
      dispatch(getUsers())
    } catch(error){
      console.log(error)
    }

  }

  const handleBlockUser = async (userId) => {
    try{
      await dispatch(blockUser(userId));
      dispatch(getUsers())
    } catch (error) {
      console.log(error)
    }
  };

  
  const handleUnBlockUser = async (userId) => {
    try{
      await dispatch(unblockUser(userId));
      dispatch(getUsers())
    } catch (error) {
      console.log(error)

    }
  };
  const formattedCustomers = customers.map((customer) => ({
    id: customer._id,
    isBlocked: customer.isBlocked,
    ...customer,
  }));

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.isBlocked ? (
              <button type="button" className="btn btn-primary" onClick={() => handleUnBlockUser(params.row.id)}>
                Unblock
              </button>
            ) : (
              <button type="button" className="btn btn-warning" onClick={() => handleBlockUser(params.row.id)}>
                Block
              </button>
            )}
            <button type="button" className="btn btn-danger" onClick={() => handleDeleteUser(params.row.id)}>
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 640, width: "100%" }}>
      <h2 style={{ textAlign: "center", fontWeight: 700 }}>Users List</h2>
      <DataGrid
        rows={formattedCustomers}
        columns={(Usercolumns || []).concat(actionColumn)}
        loading={isLoading}
        pagination
        pageSize={10}
        pageSizeOptions={[10, 25]}
      />
    </div>
  );
}
