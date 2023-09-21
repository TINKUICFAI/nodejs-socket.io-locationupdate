"use strict";

const UserService = require("../services/UserService");
const UserAddressService = require("../services/UserAddressService");
const helpers = require("../util/helpers");
const RegexEscape = require("regex-escape");

module.exports = () => {
  const register = async (req, res, next) => {
    console.log("UserController => register");
    let { email, password, name, phone, profileImage, latitude, longitude } =
      req.body;

    email = email.toLowerCase();
    password = await helpers().hashPassword(password);

    let user = {
      email,
      password,
      name,
      phone,
      profileImage,
      latitude,
      longitude,
    };

    await UserService().registerUser(user);

    user = await UserService().fetchByQueryToEdit({ email });

    req.rData = user;

    next();
  };

  const login = async (req, res, next) => {
    console.log("UserController => login");
    let { email, password } = req.body;

    if (email) email = email.toLowerCase();

    let email_query = { email };

    let token = "";
    let user = await UserService().fetchByQuery(email_query);

    if (user) {
      let passwordVerify = await UserService().verifyPassword(
        user._id,
        password
      );

      if (!passwordVerify) {
        return res.status(400).send({
          code: 0,
          message: "Entered password is incorrect!",
          data: {},
        });
      }

      user = await UserService().fetch(user._id);

      token = await helpers().createJWT({ userId: user._id });

      await UserService().updateProfile(user._id, { token });

      req.rData = { user, token };
    } else {
      req.rCode = 0;
      req.msg = "user_not_found";
      req.rData = {};
    }

    next();
  };

  const getDetails = async (req, res, next) => {
    console.log("UserController => getDetails");
    let { userId } = req.body;
    let user = await UserService().fetch(userId);

    if (user) {
      req.msg = "user_details";
      req.rData = user;
    } else {
      req.rCode = 0;
      req.msg = "user_not_found";
      req.rData = {};
    }

    next();
  };

  const editProfile = async (req, res, next) => {
    console.log("UserController => editProfile");
    let userId = req.body.userId;
    let { email } = req.body;
    if (email) {
      req.body.email = email.toLowerCase();
    }

    let user = await UserService().updateProfile(userId, req.body);

    user = await UserService().fetch(userId);

    req.msg = "profile_changed";

    req.rData = user;
    // }
    next();
  };

  const changePassword = async (req, res, next) => {
    console.log("UserController => changePassword");
    let { currentPassword, newPassword, userId, confirmPassword } = req.body;

    let passwordVerify = await UserService().verifyPassword(
      userId,
      currentPassword
    );

    if (confirmPassword !== newPassword) {
      return res.status(400).send({
        code: 0,
        message: "confirmPassword and newPassword not matched!",
      });
    }

    if (!passwordVerify) {
      req.rCode = 0;
      req.msg = "incorrect_current_password";
      req.rData = {};
    } else {
      newPassword = await helpers().hashPassword(newPassword);

      await UserService().resetPassword(userId, newPassword);

      req.msg = "password_changed";
    }

    next();
  };

  const getAllUserList = async (req, res, next) => {
    console.log("UserController => getAllUserList");
    let { search, page, limit, isActive } = req.query;

    page = page ? parseInt(page) : 0;
    limit = limit ? parseInt(limit) : 10;

    let query = { isDeleted: false };

    if (search) {
      query = {
        $or: [
          {
            fullName: { $regex: RegexEscape(search), $options: "i" },
          },
          {
            email: { $regex: RegexEscape(search), $options: "i" },
          },
          {
            mobileNumber: { $regex: RegexEscape(search), $options: "i" },
          },
          {
            customerId: { $regex: RegexEscape(search), $options: "i" },
          },
        ],
        isDeleted: false,
      };
    }

    if (isActive) query.isActive = isActive;

    let user = await UserService().getUser(query, page, limit);
    let total_user = await UserService().countUser(query);

    req.msg = "users_list";

    req.rData = {
      search,
      page,
      limit,
      isActive,
      total_user,
      user,
    };

    next();
  };

  const logout = async (req, res, next) => {
    console.log("UserController => logout");
    let { userId } = req.body;

    let user = { token: "" };
    user = await UserService().updateProfile(userId, user);
    req.msg = "logout";
    next();
  };

  /**
   * Address
   */
  const addUserAddress = async (req, res, next) => {
    console.log("UserController => addUserAddress");
    let UserAddress = await UserAddressService().addUserAddress(req.body);
    req.rData = {};
    req.msg = "success";
    next();
  };

  const getUserAddress = async (req, res, next) => {
    console.log("UserController => getUserAddress");

    let { page, limit, search } = req.query;
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;

    let userId = req.body.userId;
    let query = { userId };

    if (search) {
      query = {
        $or: [
          {
            address: { $regex: RegexEscape(search), $options: "i" },
          },
          {
            country: { $regex: RegexEscape(search), $options: "i" },
          },
          {
            city: { $regex: RegexEscape(search), $options: "i" },
          },
          {
            state: { $regex: RegexEscape(search), $options: "i" },
          },
        ],
        userId,
      };
    }

    let address = await UserAddressService().getUserAddress(query, page, limit);

    let total = await UserAddressService().countUserAddress(query);

    req.rData = { page, limit, total, address };
    req.msg = "success";
    next();
  };

  return {
    register,
    login,
    getDetails,
    editProfile,
    getAllUserList,
    changePassword,
    logout,
    /**
     * Address
     */
    addUserAddress,
    getUserAddress,
  };
};
