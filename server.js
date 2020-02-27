const express = require("express");
const app = express();
const server = require("http").Server(app);

const cors =require("cors");
const bodyParser = require("body-parser");
const socket = require("./socket");
const db = require("./db");
const router = require("./network/routes");

//Localhost connection
const url = "mongodb://localhost:27017/telegrom";

db(url);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

socket.connect(server);

router(app);

app.use("/app", express.static("public"));

server.listen(3000, function() {
  console.log("Servidor en la URL http://localhost:3000");
});
