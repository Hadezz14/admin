import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { DataGrid } from '@mui/x-data-grid';
import { recntOrders } from "../Datasource.js";
import { orderData } from "../Datasource.js";
import { Link, Route, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";




function createData(id, name, product, amount, date) {
  return { id, name, product, amount, date };
}

const rows = [
  createData(1, 'John Doe', 'Item A', 10, '2023-06-01'),
  createData(2, 'Jane Smith', 'Item B', 5, '2023-06-02'),
  createData(3, 'Mike Johnson', 'Item C', 8, '2023-06-03'),
  createData(4, 'Sarah Brown', 'Item D', 15, '2023-06-04'),
  createData(5, 'David Wilson', 'Item E', 3, '2023-06-05'),
  createData(6, 'Emily Davis', 'Item F', 12, '2023-06-06'),
  createData(7, 'Daniel Lee', 'Item G', 7, '2023-06-07'),
  createData(8, 'Sophia Anderson', 'Item H', 9, '2023-06-08'),
  createData(9, 'Michael Brown', 'Item I', 4, '2023-06-09'),
  createData(10, 'Olivia Taylor', 'Item J', 6, '2023-06-10'),
];

function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sn</TableCell>
            <TableCell align="Center">Name</TableCell>
            <TableCell align="Center">Product</TableCell>
            <TableCell align="Center">Amount</TableCell>
            <TableCell align="Center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.product}</TableCell>
          <TableCell>{row.amount}</TableCell>
          <TableCell>{row.date}</TableCell>
        </TableRow>
      ))}
    </TableBody>
      </Table>
    </TableContainer>
  );
}

const Dashboard = () => {
  const navigate = useNavigate();
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sept",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
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
        alias: "Income",
      },
    },
  };

  const config2 = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#008000";
    },
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
        alias: "Income",
      },
    },
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
          <Column {...config} />
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
