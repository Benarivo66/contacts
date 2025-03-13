const express = require("express");
require("dotenv").config();
const app = express();
const contactsRoute = require("./routes/contact")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) 

app.get("/", (req, res, next) => {
    res.send("Welcome to the contacts home page")
});
app.use("/contacts", contactsRoute);

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
