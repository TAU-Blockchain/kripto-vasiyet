const axios = require("axios");

module.exports = async function useGetRequest(url, params) {
  try {
    const response = await axios.get(url, { params });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Axios GET request error:", error.message);
    throw error;
  }
};
