const validator = require("node-input-validator");
const ResponseMiddleware = require("../middlewares/ResponseMiddleware.js");
const helpers = require("../util/helpers.js");
const { models } = require("../models");
validator.extend("unique", async function ({ value, args }) {
  console.log("ValidatorsIndex => unique", args);
  console.log(args);

  let result = null;

  if (args.length > 2) {
    result = await models[args[0]].findOne({
      where: {
        [args[1]]: value,
        [args[2]]: { $not: args[3] },
      },
    });
  } else {
    result = await models[args[0]].find({
      [args[1]]: value,
    });
  }
  return result.length == 0 ? true : false;
});

/**
 * to check given id exists in given table
 * additional column checks can be passed in pairs
 * e.g exists:table_name,primary_id,col1,value1,col2,value2 and so on
 * col-value must be in pairs
 */
validator.extend("exists", async function ({ value, args }) {
  console.log("ValidatorsIndex => exists");
  console.log(value);
  console.log(args);
  let result = await models[args[0]].find({
    [args[1]]: value,
  });

  return result.length > 0 ? true : false;
});

validator.extend("allowedValues", ({ value, args }) => {
  return args.indexOf(value) > -1 ? true : false;
});

validator.extendMessages(
  {
    required: "The :attribute field must not be empty.",
    email: "E-mail must be a valid email address.",
    exists: "The :attribute is not found!",
  },
  "en"
);
module.exports = {
  //common function to send validation response
  validate: (v, res, next, req = null) => {
    console.log("ValidatorsIndex => validate");

    if (
      v.check().then(function (matched) {
        if (!matched) {
          req.rCode = 0;
          let message = helpers().getErrorMessage(v.errors);

          ResponseMiddleware(req, res, next, message);
        } else {
          next();
        }
      })
    );
  },

  validations: {
    general: {
      requiredNumeric: "required|numeric",
      requiredBoolean: "required|boolean",
      requiredArray: "required|array",
      requiredEmail: "required|email",
      required: "required",
      nullable: "nullable",
      requiredInt: "required|integer",
      requiredString: "required|string|maxLength:255",
      nullableString: "nullable|string|maxLength:255",
      requiredText: "required|string|maxLength:5000",
      requiredTodayOrAfterDate: "required|dateAfterToday:today,.|date",
      requiredDate: "required|date",
      nullableDate: "nullable|date",
    },
    user: {
      id: "required|string|exists:User,_id|maxLength:250",
      email: "required|string|unique:User,email|maxLength:50",
      mobile: "required|string|unique:User,mobile|maxLength:50",
      existsEmail: "required|email|exists:User,email|maxLength:50",
      existsmobile: "required|string|exists:User,mobile|maxLength:50",
      nullablemail: "email|unique:User,email|maxLength:50",
      user: "required|exists:User,_id|maxLength:50",
      activity: "required|exists:UserActivity,_id|maxLength:50",
    },
  },
};
