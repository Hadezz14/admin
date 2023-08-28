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



  export const OrderColumn = [
    { field: 'id', headerName: 'Order ID', width: 210},
    { field: 'orderedItems', headerName: 'Orders', width: 150 },
    { field: 'quantity', headerName: 'Sold Quantity', width: 90 },
    { field: 'orderStatus', headerName: 'Status', width: 120 },
    { field: 'firstName', headerName: 'Ordered By', width: 150 },
    { field: 'city', headerName: 'Address', width: 150 },
    {
      field: 'createdAt',
      headerName: 'Ordered Date',
      width: 190,
      valueFormatter: (params) => {
        const createdAtDate = new Date(params.value);
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        };
        return createdAtDate.toLocaleString(undefined, options);
      },
    },
    { field: 'totalPrice', headerName: 'Total Price', width: 120 },
  ];

  export const ColorBadge = ({ color }) => {
    const colorStyle = {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: color,
      display: 'inline-block',
      marginRight: '4px',
      border: '1px solid #ccc',
    };
  
    return <div style={colorStyle}></div>;
  };

 export const Productcolumns = [
    { field: 'title', headerName: ' Title', width: 130 },
    {
      field: 'color',
      headerName: 'Colors',
      width: 120,
      renderCell: (params) => {
        const colors = params.value; // Assuming params.value is an array of colors
        return (
          <div>
            {colors.map((color, index) => (
              <ColorBadge key={index} color={color} />
            ))}
          </div>
        );
      },
    },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'price', headerName: 'Price', width: 100 },
  ];

 export const Categorycolumns = [
    { field: 'title', headerName: ' Name', width: 130 },
  ];

 export const Couponcolumns = [
    { field: 'id', headerName: 'SN', width: 20 },
    { field: 'name', headerName: ' Name', width: 130 },
    { field: 'discount', headerName: ' Discount', width: 130 },
    { field: 'expiry', headerName: ' Expiry Date', width: 130 },];
  
export const Enquirycolumns = [
    { field: 'name', headerName: ' Name', width: 130 },
    { field: 'email', headerName: 'email', width: 130 },
    { field: 'comment', headerName: 'Message', width: 150 },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 190,
      valueFormatter: (params) => {
        const createdAtDate = new Date(params.value);
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        };
        return createdAtDate.toLocaleString(undefined, options);
      },
    },
  ];