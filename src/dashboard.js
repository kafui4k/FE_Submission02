import getDashboardData, { refreshToken } from "./getDashboardData";
import "./styles/main.scss";
import logo from "./assets/Freddys_Logo.svg";
import { Chart } from "chart.js";
import axios from "axios";

const pumpKin = document.getElementById("logoImg");
pumpKin.src = logo;

const table = document.getElementById("best-sellers-table-data");
const myChart = document.getElementById("myChart");

var access_token = localStorage.getItem("acctoken");
var refresh_token = localStorage.getItem("reftoken");

function isLoggedIn() {
  return access_token ? true : false;
}

const loggedIn = isLoggedIn();

if (!loggedIn) {
  window.location = "/";
}

async function data() {
  let apiData;
  if (access_token) {
    apiData = await getDashboardData(access_token, refresh_token);

    // check if its fiften minutes from time logged in
    // send a refresh token
    var d = new Date();
    var minutes = 15 - (d.getMinutes() % 15); // the number of minutes till the next 15.
    // window.setTimeout(doSomething, minutes * 60 * 1000);
    var ddM = minutes * 60 * 1000;

    // if (ddM) {
    //   apiData = await refreshToken(refresh_token);
    // } else {
    //   console.error("token not available");
    // }
  } else {
    console.error("token not available");
  }

  const pN = apiData.bestsellers.map((pName) => pName.product.name);
  const units = apiData.bestsellers.map((unit) => unit.units);
  const revenue = apiData.bestsellers.map((bs) => bs.revenue);

  const sales = apiData.sales_over_time_week;

  var oppp = [];

  for (let i = 0; i < 3; i++) {
    oppp.push(pN[i].toString());
  }

  console.log(sales[1].orders);

  const thead = document.createElement("thead");
  thead.classList.add("table-head");
  thead.innerHTML = `
      <th>Prooduct Name</th>
      <th>Price</th>
      <th># Units Sold</th>
      <th>Revenue</th>
    `;

  const tbboddy = document.createElement("tbody");
  tbboddy.classList.add("table-body");
  tbboddy.innerHTML = `
          <tr>
              <td>${oppp}</td>
              <td></td>
              <td>${units[0]}</td>
              <td>${revenue[0]}</td>
          </tr>
          `;

  table.appendChild(thead);
  table.appendChild(tbboddy);
}

data();
