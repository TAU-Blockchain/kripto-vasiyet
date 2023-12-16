const router = require("express").Router();
const axios = require("axios");
const pool = require("../utils/hooks/usePool");
const faker = require("faker");
const useGetRequest = require("../utils/hooks/useGetRequest");

router.get("/addDummy", async (req, res) => {
  const numberOfRecords = 1000;
  let startTcNo = 0;

  try {
    for (let i = 0; i < numberOfRecords; i++) {
      const name_lastname = faker.name.findName();
      const tc_no = startTcNo.toString().padStart(11, "0");
      startTcNo++;

      const query = `INSERT INTO user (name_lastname, tc_no) VALUES ('${name_lastname}', ${tc_no})`;

      await pool.query(query);
      console.log(`Added dummy data: ${name_lastname}, TC: ${tc_no}`);
    }

    res.send("Dummy datas added successfully.");
  } catch (error) {
    console.error("An error occurred: " + error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/kill/:id", async (req, res) => {
  const userId = req.params.id;
  const updateSql = "UPDATE user SET isAlive = 1 WHERE id = ?";

  try {
    await pool.query(updateSql, [userId]);
    res.status(200).json({ message: "isAlive value set to 0" });
  } catch (error) {
    console.error("An error occurred: " + error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/revive/:id", async (req, res) => {
  const userId = req.params.id;
  const updateSql = "UPDATE user SET isAlive = 0 WHERE id = ?";

  try {
    await pool.query(updateSql, [userId]);
    res.status(200).json({ message: "isAlive value set to 1" });
  } catch (error) {
    console.error("An error occurred: " + error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/isAlive/:id", (req, res) => {
  const userId = req.params.id;
  const selectSql = "SELECT isAlive FROM user WHERE id = ?";
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Invalid parameter." });
  }

  pool.getConnection((getConnectionErr, connection) => {
    if (getConnectionErr) {
      console.error(
        "The database connection could not be established: " +
          getConnectionErr.message
      );
      return res.status(500).json({ error: "Internal Server Error" });
    }

    try {
      connection.query(selectSql, [userId], (queryErr, results) => {
        connection.release();

        if (queryErr) {
          console.error("Error executing isAlive query: " + queryErr.message);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length > 0) {
          const isAlive = results[0].isAlive;
          console.log("Is Alive:", isAlive);

          return res.status(200).json({ isAlive });
        } else {
          return res.status(404).json({ error: "User not found" });
        }
      });
    } catch (error) {
      console.error("An error occurred: " + error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

router.get("/getUserStatus/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const response = await axios.get(
      `http://localhost:8001/user/isAlive/${userId}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
