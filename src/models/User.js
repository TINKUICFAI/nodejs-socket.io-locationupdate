const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required!"],
    },
    phone: {
      type: String,
      required: [true, "phone is required!"],
    },
    password: {
      type: String,
      required: [true, "password is required!"],
    },
    email: {
      type: String,
      required: [true, "email is required!"],
    },
    profileImage: {
      type: String,
      default: "",
    },
    latitude: {
      type: String,
      requires: [true, "latitude is required!"],
    },
    longitude: {
      type: String,
      requires: [true, "longitude is required!"],
    },
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
