import axios from "axios";

async function getDashboardData(access_token, refresh_token) {
  try {
    const response = await axios.get(`https://freddy.codesubmit.io/dashboard`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status == 200) {
      console.log(response.data);

      return response.data.dashboard;
    } else {
      console.log("Send refresh data");
      //   try {
      //     const response = await axios.post(
      //       `https://freddy.codesubmit.io/refresh`,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${refresh_token}`,
      //         },
      //       }
      //     );
      //     if (response.status == 200) {
      //       console.log(response.data);

      //       return response.data.dashboard;
      //     } else {
      //       console.error("Error fetching refreshed data");
      //     }
      //   } catch (error) {
      //     console.error("Error refreshing data", error);
      //   }
    }
  } catch (error) {
    console.error("Error ", error);
  }
}

export default getDashboardData;

export async function refreshToken(token) {
  try {
    const response = await axios.post(`https://freddy.codesubmit.io/refresh`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 200) {
      console.log(response.data);

      return response.data.dashboard;
    } else {
      console.error("Error fetching refreshed data");
    }
  } catch (error) {
    console.error("Error ", error);
  }
}
