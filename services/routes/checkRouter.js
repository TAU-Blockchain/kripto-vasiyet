const router = require("express").Router();
const pool = require("../utils/hooks/usePool");
const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const sendGetRequest = async () => {
  try {
    const response = await axios.get("http://localhost:8001/get/users", {
      headers: {
        Authorization: process.env.SECRET_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Axios GET request error:", error.message);
    throw error;
  }
};

router.get("/users", async (req, res) => {
  const key = req.headers.authorization;
  const selectSql =
    "SELECT tc_no  FROM user WHERE isRegistered AND isAlive = 1";

  if (key !== process.env.SECRET_KEY) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  try {
    const axiosResponse = await sendGetRequest();
    return res.status(200).json(axiosResponse);
  } catch (error) {
    console.error("An error occurred: " + error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
