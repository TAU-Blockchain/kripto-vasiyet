const pool = require("../hooks/usePool");

module.exports = function useUser(id) {
  return new Promise((resolve, reject) => {
    const userId = id;
    const selectSql = "SELECT * FROM user WHERE id = ?";

    pool.getConnection((err, connection) => {
      if (err) {
        console.error(
          "The database connection could not be established: " + err.message
        );
        reject(err);
        return;
      }

      connection.query(selectSql, [userId], (queryErr, results) => {
        if (queryErr) {
          connection.release();
          console.error("Error querying user: " + queryErr.message);
          reject(queryErr);
          return;
        }

        if (results.length === 0) {
          connection.release();
          reject(new Error("User not found."));
          return;
        }

        const user = results[0];
        resolve(user);
      });
    });
  });
};
