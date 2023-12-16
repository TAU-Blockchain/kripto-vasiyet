const router = require("express").Router();
const useGetRequest = require("../utils/hooks/useGetRequest");
const useUser = require("../utils/hooks/useUser");

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Invalid parameter." });
  }

  try {
    const data = await useUser(id);
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred: " + error,
    });
  }
});

router.get("/user-all", async (req, res) => {
  const url = "http://localhost:8001/get/user-all";

  try {
    const axiosResponse = await useGetRequest(url);
    return res.status(200).json(axiosResponse);
  } catch (error) {
    console.error("An error occurred: " + error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user-by-type/:type/:value", async (req, res) => {
  const { type, value } = req.params;
  const url = `http://localhost:8001/get/user-by-type/${type}/${value}`;

  try {
    const axiosResponse = await useGetRequest(url);
    return res.status(200).json(axiosResponse);
  } catch (error) {
    console.error("An error occurred: " + error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
