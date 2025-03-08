const express = require("express");
require("dotenv").config();
const app = express();
const contactsRoute = require("./routes/contact")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/contacts", contactsRoute);

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
