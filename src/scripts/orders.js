import "../styles/main.scss";
import logo from "../assets/Freddys_Logo.svg";
import right_arrow from "../assets/arrow_right_FILL1_wght400_GRAD0_opsz48.svg";
import searchIcon from "../assets/search_FILL1_wght400_GRAD0_opsz48.svg";
import axios from "axios";

var access_token = localStorage.getItem("acctoken");

function isLoggedIn() {
  return access_token ? true : false;
}

const loggedIn = isLoggedIn();

if (!loggedIn) {
  window.location = "/";
}

const pumpKin = document.getElementById("logoImg");
pumpKin.src = logo;

const rightArrow = document.getElementById("right-arrow");
rightArrow.src = right_arrow;

const searchOrderInpt = document.getElementById("search-order");
const search = document.getElementById("search-icon");
search.src = searchIcon;

search.addEventListener("click", async function (event) {
  event.preventDefault();

  const search_term = searchOrderInpt.value;

  if (search_term) {
    const searchResult = await searchOrder(search_term, access_token);

    searchOrderInpt.value = "";

    if (searchResult) {
      console.log({ searchResult });

      const orderStatus = searchResult.map((orderItem) => orderItem.status);

      const orderName = searchResult.map(
        (orderItemName) => orderItemName.product.name
      );

      console.log({ orderStatus, orderName });

      const tboddy = document.getElementById("table-data-values");
      tboddy.innerHTML = `
                <tr>
                    <td>${orderName}</td>
                    <td></td>
                    <td></td>
                    <td>${orderStatus}</td>
                </tr>
                `;
      table.appendChild(tboddy);
    }
  } else {
    return;
  }
});

async function searchOrder(search_term, access_token) {
  try {
    const response = await axios.get(
      `https://freddy.codesubmit.io/orders?page=1&q=${search_term}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (response.status == 200) {
      return response.data.orders;
    } else {
      console.error("Error fetching Order");
    }
  } catch (error) {
    console.error("Error ", error);
  }
}
