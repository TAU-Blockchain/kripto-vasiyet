const router = require("express").Router();
const pool = require("../utils/hooks/usePool");

router.put("/kill/:id", (req, res) => {
  const userId = req.params.id;
  const updateSql = "UPDATE user SET isAlive = 1 WHERE id = ?";
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Invalid parameter." });
  }
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(
          "The database connection could not be established: " + err.message
        );
        return res.status(500).json({ error: "Internal Server Error" });
      }

      connection.query(updateSql, [userId], (queryErr, results) => {
        connection.release();

        if (queryErr) {
          console.error("Error updating isAlive: " + queryErr.message);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.status(200).json({ message: "isAlive value set to 0" });
      });
    });
  } catch (error) {
    console.error("An error occurred: " + error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/revive/:id", (req, res) => {
  const userId = req.params.id;
  const updateSql = "UPDATE user SET isAlive = 0 WHERE id = ?";
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Invalid parameter." });
  }
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(
          "The database connection could not be established: " + err.message
        );
        return res.status(500).json({ error: "Internal Server Error" });
      }

      connection.query(updateSql, [userId], (queryErr, results) => {
        connection.release();

        if (queryErr) {
          console.error("Error updating isAlive: " + queryErr.message);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.status(200).json({ message: "isAlive value set to 1" });
      });
    });
  } catch (error) {
    console.error("An error occurred: " + error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/isAlive/:id", (req, res) => {
  const userId = req.params.id;
  const updateSql = "SELECT isAlive FROM user WHERE id = ?";
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Invalid parameter." });
  }
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(
          "The database connection could not be established: " + err.message
        );
        return res.status(500).json({ error: "Internal Server Error" });
      }

      connection.query(updateSql, [userId], (queryErr, results) => {
        connection.release();

        if (queryErr) {
          console.error("Error updating isAlive: " + queryErr.message);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results[0]) {
          return res.status(200).json(true);
        } else {
          return res.status(200).json(false);
        }
      });
    });
  } catch (error) {
    console.error("An error occurred: " + error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
