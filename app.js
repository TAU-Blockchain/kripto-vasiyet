const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
//swagger
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
//routes
const getRouter = require("./routes/getRouter");
const userRouter = require("./routes/userRouter");
const checkRouter = require("./routes/checkRouter");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kripto-Vasiyet Swagger",
      version: "1.0.0",
      description: "Bilgiyi zincirle,geleceği garantile.",
    },
  },
  apis: ["api-docs/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/get", getRouter);
app.use("/user", userRouter);
app.use("/check", checkRouter);

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});
