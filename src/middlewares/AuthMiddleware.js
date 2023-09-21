const jwt = require("jsonwebtoken");
const ResponseMiddleware = require("./ResponseMiddleware");
const JWTSECRET = process.env.JWTSECRET;
const UserService = require("../services/UserService");

module.exports = () => {
  const verifyUserToken = async (req, res, next) => {
    console.log("AuthMiddleware => verifyUserToken");
    let usertoken = req.headers.authorization;

    try {
      if (usertoken) {
        let tokens = usertoken.split(" ");

        let token = tokens[1];
        let payload = jwt.verify(token, JWTSECRET);

        let user = await UserService().fetchByQuery({
          _id: payload.userId,
          token,
        });

        if (user) {
          console.log(`User with ID ${user._id} entered.`);
          req.body.userId = user._id;
          next();
        } else {
          throw new Error("invalid_token");
        }
      } else {
        throw new Error("invalid_token");
      }
    } catch (ex) {
      // console.log("heres",ex)

      req.msg = "invalid_token";
      if (ex.message == "ac_deactivated") req.msg = ex.message;

      req.rCode = 0;
      ResponseMiddleware(req, res, next);
    }
  };

  const checkEmailAndMobileToEditProfile = async (req, res, next) => {
    console.log("AuthMiddleware => checkEmailAndMobileToEditProfile");
    try {
      let { phone, email, userId } = req.body;

      if (email) email = email.toLowerCase();

      let mobileExist = null;
      if (phone) {
        var query = { phone, _id: { $ne: userId } };

        mobileExist = await UserService().fetchByQueryToEdit(query);
      }

      if (mobileExist) {
        req.rCode = 0;
        req.msg = "mobile_exist";
        ResponseMiddleware(req, res, next);
      } else {
        if (email) {
          let query = { email, _id: { $ne: userId } };

          console.log("query", query);
          let emailExist = await UserService().fetchByQueryToEdit(query);

          if (emailExist) {
            req.rCode = 0;
            req.msg = "email_exist";
            ResponseMiddleware(req, res, next);
          } else {
            next();
          }
        } else {
          next();
        }
      }
    } catch (ex) {}
  };

  return {
    verifyUserToken,
    checkEmailAndMobileToEditProfile,
  };
};
