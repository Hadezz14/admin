import React, { useEffect } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Link, Route, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"; 
import { getOrders } from "../features/order/orderSlice";

function BasicTable() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  React.useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(getOrders());
    }
  }, [dispatch, orders]);

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
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.shippingInfo.firstName}</TableCell>
              <TableCell>
                {row.orderedItems.map((item) => item.product).join(", ")}
              </TableCell>
              <TableCell>{row.totalPrice}</TableCell>
              <TableCell>{formatDate(row.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    if (!orders || orders.length === 0) {
      dispatch(getOrders());
    }
  }, [dispatch, orders]);

  const monthlySalesData = orders.reduce((acc, order) => {
    const monthYear = order.createdAt.substring(0, 7); // Extract YYYY-MM
    acc[monthYear] = (acc[monthYear] || 0) + order.totalPrice;
    return acc;
  }, {});
console.log(monthlySalesData);
  const salesData = Object.keys(monthlySalesData).map((monthYear) => ({
    type: monthYear,
    sales: monthlySalesData[monthYear],
  }));
  console.log(salesData)

  const salesConfig = {
    data: salesData, 
    xField: "type",
    yField: "sales",
    color: "#ffd333",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
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


  const config2 = {
    // data,
    // xField: "type",
    // yField: "sales",
    // color: ({ type }) => {
    //   return "#008000";
    // },
    // label: {
    //   position: "middle",
    //   style: {
    //     fill: "#FFFFFF",
    //     opacity: 1,
    //   },
    // },
    // xAxis: {
    //   label: {
    //     autoHide: true,
    //     autoRotate: false,
    //   },
    // },
    // meta: {
    //   type: {
    //     alias: "Month",
    //   },
    //   sales: {
    //     alias: "Income",
    //   },
    // },
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
            <a href="#salesStates" className="see-statistics-link">
              See Sales Statistics
            </a>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Revenue</p>
            <h4 className="mb-0 sub-title">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
            <a href="#revStates" className="see-statistics-link">
              See Revenue Statistics
            </a>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Orders</p>
            <h4 className="mb-0 sub-title">1000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
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
        <div>
          {/* Pass salesData directly to the Column component */}
          <Column {...salesConfig} />
        </div>
      </div>
      <div className="mt-5" id="revStates">
        <h3 className="mb-5 title">Revenue Statics</h3>
        <div>
          <Column {...config2} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
