const dotenv = require("dotenv");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

// Express
const express = require("express");
const router = require("./App/router");
const app = express();

// Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors("*"));
app.use(express.json());
app.use(router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
