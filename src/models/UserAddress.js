const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const UserAddressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: "address require!",
    },
    city: {
      type: String,
      required: "city require!",
    },
    state: {
      type: String,
      required: "state require!",
    },
    country: {
      type: String,
      required: "state require!",
    },
    pinCode: {
      type: Number,
      required: "pinCode require!",
    },
  },
  { timestamps: true }
);

var UserAddress = mongoose.model("UserAddress", UserAddressSchema);

module.exports = UserAddress;
