import axios from "axios";

async function login(username, password) {
  try {
    const response = await axios.post(`https://freddy.codesubmit.io/login`, {
      username: username,
      password: password,
    });

    if (response.status == 200) {
      return response.data;
    } else {
      console.error("Error fetching user data");
    }
  } catch (error) {
    console.error("Error ", error);
  }
}

export default login;
