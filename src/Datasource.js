import Color from "./components/Color";

export const Usercolumns = [
    { field: 'id', headerName: 'SN', width: 20 },
    { field: 'firstname', headerName: ' First Name', width: 120 },
    { field: 'lastname', headerName: ' Last Name', width: 120 },
    { field: 'email', headerName: 'Email', width: 160 },
    { field: 'mobile', headerName: 'Contact Number', width: 150 },
  ];

export const rows = [
    { id: 1, name: 'Aran', email: 'aran@gmail.com', contact: '9801231232'},
    { id: 2, name: '<NAME>', email:'sachin@<EMAIL>', contact: '987654598'},
    { id: 3, name: 'Rajesh', email: 'rajesh'},
    { id: 4, name: 'Suresh', email:'suresh'},
    { id: 5, name: 'Kumar', email: 'kumars'},
    { id: 6, name: 'Vijay', email: 'vijay'},
    { id: 7, name: 'Arun', email: 'arun'},
    { id: 8, name: 'Gopalakrishnan', email:'kjhgfg'},
    { id: 9, name: 'Mohammed', email:'mohammad'},
    { id: 10, name: 'Joseph', email: 'jose'},
    { id: 11, name: 'Prakash', email: 'prashant'},
    { id: 12, name: 'Peter', email: 'peter'},
    { id: 13, name: 'Johnson', email: 'johnson'},
    { id: 14, name: 'Thomas', email: 'thomass'},
    { id: 15, name: 'Naveen', email: 'nave'},
    { id: 16, name: 'Manoj', email:'manojs'},
    { id: 17, name: 'Anil', email: 'anils'},
    { id: 18, name: 'Shivaji', email:'shivajis'},
  ];



  export const orderColumn = [
    {
      field: 'id', // This field must match the property name in the rows data
      headerName: 'Order ID', // Header displayed in the DataGrid
      width: 200,
      valueGetter: (params) => params.row._id,
    },
    {
      field: 'orderby', // This field must match the property name in the rows data
      headerName: 'Ordered By', // Header displayed in the DataGrid
      width: 200,
      valueGetter: (params) => params.row.user?.firstname + '' + params.row.user?.lastname || "N/A",
    },
    {
      field: 'products',
      headerName: 'Products',
      width: 300,
      renderCell: (params) => {
        // Custom render function for the "Products" column
        const orderedItems = params.row.orderedItems|| [];
        const productsString = orderedItems.map((item) =>{
          const {quantity,product,color} = item;
          if(product){
            return `${quantity} x ${product.title} (${color}) `
          }
          return "Product Not Available";
          
        }).join(',');
        return <div>{productsString}</div>;
      },
    },
    {
      field: 'shipping_address',
      headerName: 'Address',
      width: 150,
    },
    {
      field: 'OrderStatus',
      headerName: 'Order Status',
      width: 150,
    },
    {
      field: 'total_amount',
      headerName: 'Total',
      width: 100,
    }
  ];
  export const recntOrders = [
    { field: 'id', headerName: 'SN', width: 20 },
    { field: 'name', headerName: ' Name', width: 130 },
    { field: 'product', headerName: 'product', width: 130 },
    { field: 'amount', headerName: 'amount', type:'number', width: 80 },
    { field: 'date', headerName: 'Date', width: 150 },
  ];

  export const orderData = [
    { id: 1, name: 'John Doe', product: 'Item A', amount: 10, date: '2023-06-01', action: 'View' },
    { id: 2, name: 'Jane Smith', product: 'Item B', amount: 5, date: '2023-06-02', action: 'Edit' },
    { id: 3, name: 'Mike Johnson', product: 'Item C', amount: 8, date: '2023-06-03', action: 'Delete' },
    { id: 4, name: 'Sarah Brown', product: 'Item D', amount: 15, date: '2023-06-04', action: 'View' },
    { id: 5, name: 'David Wilson', product: 'Item E', amount: 3, date: '2023-06-05', action: 'Edit' },
    { id: 6, name: 'Emily Davis', product: 'Item F', amount: 12, date: '2023-06-06', action: 'Delete' },
    { id: 7, name: 'Daniel Lee', product: 'Item G', amount: 7, date: '2023-06-07', action: 'Edit' },
    { id: 8, name: 'Sophia Anderson', product: 'Item H', amount: 9, date: '2023-06-08', action: 'View' },
    { id: 9, name: 'Michael Brown', product: 'Item I', amount: 4, date: '2023-06-09', action: 'Delete' },
    { id: 10, name: 'Olivia Taylor', product: 'Item J', amount: 6, date: '2023-06-10', action: 'Edit' },
    // { id: 11, name: 'Ethan Wilson', product: 'Item K', amount: 14, date: '2023-06-11', action: 'View' },
    // { id: 12, name: 'Isabella Moore', product: 'Item L', amount: 11, date: '2023-06-12', action: 'Edit' },
    // { id: 13, name: 'Mason Thompson', product: 'Item M', amount: 8, date: '2023-06-13', action: 'Delete' },
    // { id: 14, name: 'Ava Martinez', product: 'Item N', amount: 3, date: '2023-06-14', action: 'View' },
    // { id: 15, name: 'William Garcia', product: 'Item O', amount: 5, date: '2023-06-15', action: 'Edit' },
  ];

 export const Productcolumns = [
    { field: 'id', headerName: 'SN', width: 20 },
    { field: 'title', headerName: ' Title', width: 130 },
    { field: 'color', headerName: 'Color', width: 90 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'price', headerName: 'Price', width: 100 },
  ];

 export const Categorycolumns = [
    { field: 'id', headerName: 'SN', width: 20 },
    { field: 'title', headerName: ' Name', width: 130 },
  ];

 export const Couponcolumns = [
    { field: 'id', headerName: 'SN', width: 20 },
    { field: 'name', headerName: ' Name', width: 130 },
    { field: 'discount', headerName: ' Discount', width: 130 },
    { field: 'expiry', headerName: ' Expiry Date', width: 130 },];
  
export const Enquirycolumns = [
    { field: 'id', headerName: 'SN', width: 20 },
    { field: 'name', headerName: ' Name', width: 130 },
    { field: 'email', headerName: 'email', width: 130 },
    { field: 'message', headerName: 'Message', width: 150 },
    { field: 'date', headerName: 'Date', type:'date', width: 150 },
  ];