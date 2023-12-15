const router = require("express").Router();
const pool = require("../utils/hooks/usePool");
const dotenv = require("dotenv");
dotenv.config();

router.get("/users", async (req, res) => {
  const key = req.headers.authorization;
  const selectSql =
    "SELECT tc_no  FROM user WHERE isRegistered AND isAlive = 1";
  if (key !== process.env.SECRET_KEY) {
    return res.status(403).json({ message: "Invalid API key" });
  }
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
          console.error("Error querying users: " + queryErr.message);
          return;
        }
        return res.status(200).json(results);
      });
    });
  } catch (error) {
    console.error("An error occured: " + error.message);
    return res.status(500).json({ error: "Users not found." });
  }
});

module.exports = router;
