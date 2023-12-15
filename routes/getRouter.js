const router = require("express").Router();
const pool = require("../utils/hooks/usePool");
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
      message: "An error occured: " + error,
    });
  }
});
router.get("/user-all", async (req, res) => {
  const selectSql = "SELECT * FROM user ";

  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(
          "The database connection could not be established: " + err.message
        );
        return;
      }

      connection.query(selectSql, (queryErr, results) => {
        if (queryErr) {
          connection.release();
          console.log(queryErr);
          console.error("Error querying user: " + queryErr.message);
          return;
        }
        return res.status(200).json({ results });
      });
    });
  } catch (error) {
    console.error("An error occured: " + error.message);
    return res.status(500).json({ error: "Users not found." });
  }
});
router.get("/user-by-type/:type/:value", (req, res) => {
  const type = req.params.type;
  const value = req.params.value;
  const selectSql = "SELECT * FROM user WHERE ?? = ?";

  try {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(
          "The database connection could not be established: " + err.message
        );
        return res.status(500).json({ error: "Internal Server Error" });
      }

      connection.query(selectSql, [type, value], (queryErr, results) => {
        connection.release();

        if (queryErr) {
          console.error("Error querying user: " + queryErr.message);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.status(200).json({ results });
      });
    });
  } catch (error) {
    console.error("An error occurred: " + error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
