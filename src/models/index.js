const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.LOCAL_MONGO_DB;

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;
const MONGO_DB = process.env.MONGO_DB;

const newurl = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: true,
});

const con = mongoose.connection;
mongoose.set("debug", false);
con.on("open", () => {
  console.log("connected to database");
});

module.exports = con;
