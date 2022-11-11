import login from "./login";
import "../styles/main.scss";
import logo from "../assets/Freddys_Logo.svg";

const pumpKin = document.getElementById("logoImg");
pumpKin.src = logo;

const username = document.getElementById("username");
const password = document.getElementById("password");

const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  const uValue = username.value;
  const pValue = password.value;

  if (uValue == "" || pValue == "") {
    return;
  } else {
    const data = await login(uValue, pValue);

    if (data) {
      localStorage.setItem("acctoken", data.access_token);
      localStorage.setItem("reftoken", data.refresh_token);
      return (window.location =
        "/dashboard.html" + `?user=${data.access_token}`);
    } else {
      alert("invalid username or password");
    }
  }
});
