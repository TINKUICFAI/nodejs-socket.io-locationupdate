const messages = require("../util/messages");

module.exports = (req, res, next, customMsg = "") => {
  console.log("ResponseMiddleware => exports");

  const data = req.rData ? req.rData : {};
  const code = req.rCode != undefined ? req.rCode : 1;
  const message = customMsg
    ? customMsg
    : req.msg
    ? messages()[req.msg]
    : "success";

  if (code == 1) {
    res.send({ code, message, data });
  } else if (code == 2) {
    res.status(401).send({ code, message, data });
  } else {
    res.status(400).send({ code, message, data });
  }
};
