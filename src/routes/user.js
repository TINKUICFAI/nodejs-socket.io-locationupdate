const userRouter = require("express").Router();
const UserValidator = require("../validators/UserValidator");
const UserController = require("../controllers/UserController");
const ErrorHandlerMiddleware = require("../middlewares/ErrorHandlerMiddleware");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

//register user
userRouter.post(
  "/register",
  UserValidator().validateRegister,
  AuthMiddleware().checkEmailAndMobileToEditProfile,
  ErrorHandlerMiddleware(UserController().register),
  ResponseMiddleware
);

//user login
userRouter.post(
  "/login",
  UserValidator().validateEmailAndPassword,
  ErrorHandlerMiddleware(UserController().login),
  ResponseMiddleware
);

//user detail
userRouter.get(
  "/detail",
  AuthMiddleware().verifyUserToken,
  ErrorHandlerMiddleware(UserController().getDetails),
  ResponseMiddleware
);

//edit profile
userRouter.put(
  "/editProfile",
  AuthMiddleware().verifyUserToken,
  AuthMiddleware().checkEmailAndMobileToEditProfile,
  ErrorHandlerMiddleware(UserController().editProfile),
  ResponseMiddleware
);

// change password
userRouter.patch(
  "/changePassword",
  AuthMiddleware().verifyUserToken,
  UserValidator().validateChangePassword,
  ErrorHandlerMiddleware(UserController().changePassword),
  ResponseMiddleware
);

userRouter.get(
  "/logout",
  AuthMiddleware().verifyUserToken,
  ErrorHandlerMiddleware(UserController().logout),
  ResponseMiddleware
);

/**
 * Address
 */
userRouter.post(
  "/address",
  AuthMiddleware().verifyUserToken,
  UserValidator().validateAddress,
  ErrorHandlerMiddleware(UserController().addUserAddress),
  ResponseMiddleware
);

userRouter.get(
  "/address",
  AuthMiddleware().verifyUserToken,
  ErrorHandlerMiddleware(UserController().getUserAddress),
  ResponseMiddleware
);

module.exports = userRouter;
