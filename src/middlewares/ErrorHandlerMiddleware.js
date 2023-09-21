const ResponseMiddleware = require("./ResponseMiddleware");

module.exports = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (ex) {
      req.rCode = 0;
      let message = `Something went wrong -> ${ex.message}`;

      ResponseMiddleware(req, res, next, message);
    }
  };
};
