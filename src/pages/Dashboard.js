import React, { useEffect } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Link, Route, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"; 
import { getOrders, orderSlice } from "../features/order/orderSlice";

class ErrorBoundary extends React.Component{
  constructor(props){
    super(props);
    this.state ={hasError: false};
  }
  static getDerivedStateFromError(error){
    return { hasError: true};
  }
  render(){
    if(this.state.hasError){
      return<div>Something went wrong.</div>
    }
    return this.props.children;
  }
}
// const TotalStatistic =({title,value,comparisonText,comparisonPercentage,linkTo}) =>{
//   const navigate = useNavigate();
//   return(
//     <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
//       <div>
//         <p className="desc">{title}</p>
//         <h4 className="mb-0 sub-title">${value}</h4>
//       </div>
//       <div className="d-flex flex-column align-items-end">
//         <h6>
//           {comparisonPercentage > 0 ? <BsArrowUpRight /> : <BsArrowDownRight />} {Math.abs(comparisonPercentage)}%
//         </h6>
//         <p className="mb-0 desc">Compared To April 2022</p>
//         <Link to={linkTo} className="see-statistics-link">
//           {linkTo === "/admin/orders" ? "View Orders" : `See ${title} Statistics`}
//         </Link>
//       </div>
//     </div>
//   )
  
// }

function BasicTable() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  React.useEffect(() =>{
    dispatch(getOrders());
  },[])

  console.log(orders)

  const recentOrders = orders.slice(0, 10);
  console.log(recentOrders)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sn</TableCell>
            <TableCell align="center">User Name</TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentOrders.map((row, index) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row"  align="center">
                {index + 1}
              </TableCell>
              <TableCell  align="center">{row.shippingInfo.firstName}</TableCell>
              <TableCell  align="center">
                {row.orderedItems.map((item) => item.product.title).join(", ")}
              </TableCell>
              <TableCell  align="center">{row.totalPrice}</TableCell>
              <TableCell  align="center">{formatDate(row.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to="/admin/orders" className="viewOrder" onClick={() => navigate("/orders")}> View Orders </Link>
    </TableContainer>
  );
}


const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  React.useEffect(() =>{
    dispatch(getOrders());
  },[])
  

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentYear = new Date().getFullYear();

  const monthlySalesData = orders.reduce((acc, order) => {
    if (order.OrderStatus === 'Delivered') {
      const monthYear = order.createdAt.substring(0, 7); // Extract YYYY-MM
      const [year, month] = monthYear.split('-'); // Split year and month
  
      const monthName = monthNames[Number(month) - 1]; // Map month number to month name
      const formattedMonthYear = `${monthName} ${year}`; // Format to "Month Year"
  
      if (!acc[formattedMonthYear]) {
        acc[formattedMonthYear] = 0;
      }
  
      acc[formattedMonthYear] += order.totalPrice;
    }
  
    return acc;
  }, {});
    
  const salesData = monthNames.map((monthName) => {
    const formattedMonthYear = `${monthName} ${currentYear}`;
    const sales = monthlySalesData[formattedMonthYear] || 0;
    return {
      type: formattedMonthYear,
      sales: sales,
    };
  });

  // Get the current date and month
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-based

// Filter orders for the current month with orderStatus "Delivered"
const currentMonthDeliveredOrders = orders.filter(order => {
  const orderDate = new Date(order.createdAt);
  const orderMonth = orderDate.getMonth() + 1;
  return orderMonth === currentMonth && order.OrderStatus === 'Delivered';
});

// Calculate the total sales for the current month from delivered orders
const totalSalesCurrentMonth = currentMonthDeliveredOrders.reduce((total, order) => {
  return total + order.totalPrice;
}, 0);

const previousMonth = currentMonth - 1 <= 0 ? 12 : currentMonth - 1;

// Filter orders for the previous month with orderStatus "Delivered"
const previousMonthDeliveredOrders = orders.filter(order => {
  const orderDate = new Date(order.createdAt);
  const orderMonth = orderDate.getMonth() + 1;
  return orderMonth === previousMonth && order.OrderStatus === 'Delivered';
});

// Calculate the total sales for the previous month from delivered orders
const previousMonthSales = previousMonthDeliveredOrders.reduce((total, order) => {
  return total + order.totalPrice;
}, 0);

console.log('Total Sales for Previous Month (Delivered Orders):', previousMonthSales);
      
  const salesConfig = {
    data: salesData, 
    xField: "type",
    yField: "sales",
    color: "#ffd333",
    label: {
      position: "middle",
      style: {
        fill: "black",
        fontWeight: "500",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Total Sales",
      },
    },
  };

  const calculateTotalProfit = (orderedItems) => {
    return orderedItems.reduce((totalProfit, item) => {
      return totalProfit + item.product.profit * item.quantity;
    }, 0);
  };
  const totalProfit = orders.reduce((total, order) => {
    if (order.OrderStatus === 'Delivered') {
      return total + calculateTotalProfit(order.orderedItems);
    }
    return total;
  }, 0);
  console.log(totalProfit)
  // Calculate monthly profits
  const monthlyProfitData = orders.reduce((acc, order) => {
    if (order.OrderStatus === 'Delivered') {
      const monthYear = order.createdAt.substring(0, 7); // Extract YYYY-MM
      const [year, month] = monthYear.split('-'); // Split year and month
  
      const monthName = monthNames[Number(month) - 1]; // Map month number to month name
      const formattedMonthYear = `${monthName} ${year}`; // Format to "Month Year"
  
      if (!acc[formattedMonthYear]) {
        acc[formattedMonthYear] = 0;
      }
  
      acc[formattedMonthYear] += calculateTotalProfit(order.orderedItems);
    }
  
    return acc;
  }, {});
  console.log(monthlyProfitData)

  const profitData = monthNames.map((monthName) => {
    const formattedMonthYear = `${monthName} ${currentYear}`;
    const profit = monthlyProfitData[formattedMonthYear] || 0;
    return {
      type: formattedMonthYear,
      profit: profit,
    };
  });

  const totalProfitCurrentMonth = currentMonthDeliveredOrders.reduce((total, order) => {
    return total + calculateTotalProfit(order.orderedItems);
  }, 0);
  
  // Calculate the total profit for the previous month from delivered orders
  const previousMonthProfit = previousMonthDeliveredOrders.reduce((total, order) => {
    return total + calculateTotalProfit(order.orderedItems);
  }, 0);

  const profitConfig = {
    data: profitData,
    xField: "type",
    yField: "profit",
    color: "#2080ff",
    label: {
      position: "middle",
      style: {
        fill: "black",
        fontWeight: "500",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      profit: {
        alias: "Total Profit",
      },
    },
  };
  const totalSales = salesData.reduce((total, item) => total + item.sales, 0);
  const totalOrder = orders.length
  
  let salesPercentChange = 0;

if (previousMonthSales !== 0) {
  salesPercentChange = ((totalSalesCurrentMonth - previousMonthSales) / previousMonthSales) * 100;
}

let profitPercentChange = 0;
if (previousMonthProfit !== 0) {
  profitPercentChange = ((totalProfitCurrentMonth - previousMonthProfit) / previousMonthProfit) * 100;
}

console.log(previousMonthProfit)
console.log(totalProfitCurrentMonth)

console.log('Percentage Change in Sales:', salesPercentChange.toFixed(2) + '%');
console.log('Percentage Change in p:', profitPercentChange.toFixed(2) + '%');

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex flex-wrap gap-3">
        <div className="dashboard-stat-container">
          <div >
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">${totalSales}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
          {previousMonthSales !== 0 && (
            <h6>
              {salesPercentChange > 0 ? (
                <BsArrowUpRight style={{ color: 'green' }} />
              ) : (
                <BsArrowDownRight style={{ color: 'red' }} />
              )}{' '}
              {Math.abs(salesPercentChange).toFixed(2)}%
            </h6>
          )}
          {previousMonthSales !== 0 && (
            <p className="mb-0  desc">Compared To Previous Month</p>
          )}
          <a href="#salesStates" className="see-statistics-link">
            See Sales Statistics
          </a>
        </div>
        </div>
        <div className="dashboard-stat-container">
        <div>
          <p className="desc">Total Revenue</p>
          <h4 className="mb-0 sub-title">${totalProfit}</h4>
        </div>
          <div className="d-flex flex-column align-items-end">
          {previousMonthProfit !== 0 && (
            <h6>
              {profitPercentChange > 0 ? (
                <BsArrowUpRight style={{ color: 'green' }} />
              ) : (
                <BsArrowDownRight style={{ color: 'red' }} />
              )}{' '}
              {Math.abs(profitPercentChange).toFixed(2)}%
            </h6>
          )}
            {previousMonthProfit !== 0 && (
            <p className="mb-0  desc">Compared To Previous Month</p>
          )}            <a href="#revStates" className="see-statistics-link">
              See Revenue Statistics
            </a>
          </div>
        </div>
        <div className="dashboard-stat-container">
          <div>
            <p className="desc">Total Orders</p>
            <h4 className="mb-0 sub-title">Total:{totalOrder}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <Link to="/admin/orders" className="see-statistics-link" onClick={() => navigate("/orders")}> View Orders </Link>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <BasicTable/>
        </div>
      </div>
      
      <div className="mt-4" id="salesStates">
        <h3 className="mb-5 title">Sales Statics</h3>
        <ErrorBoundary>
    <div>
      {salesData && salesData.length > 0 ? (
        <Column {...salesConfig} />
      ) : (
        <p>No data</p>
      )}
    </div>
  </ErrorBoundary>
          
        
      </div>
      
      <div className="mt-5" id="revStates">
        <h3 className="mb-5 title">Revenue Statics</h3>
        <div>
          <Column {...profitConfig} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
