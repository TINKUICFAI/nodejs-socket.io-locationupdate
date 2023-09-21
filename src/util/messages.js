module.exports = (lang = "en") => {
  const user_added = {
    en: "User registered successfully",
  };

  const token_generated = {
    en: "Token generated successfully",
  };

  const user_details = {
    en: "User details",
  };

  const profile_complete = {
    en: "Profile completed successfully",
  };

  const profile_changed = {
    en: "Profile updated successfully",
  };

  const user_not_found = {
    en: "User record not found with given details!",
  };

  const user_already_found = {
    en: "User record found with given details! Try to login",
  };

  const incorrect_password = {
    en: "Entered password is incorrect!",
  };

  const incorrect_current_password = {
    en: "Entered current password is incorrect!",
  };

  const otp_sent = {
    en: "OTP sent on given mobile",
  };

  const otp_sent_on_mail = {
    en: "OTP sent on given email",
  };
  const incorrect_otp = {
    en: "Entered OTP is incorrect!",
  };

  const otp_not_verified = {
    en: "OTP is not verified!",
  };

  const otp_verified = {
    en: "OTP verified successfully!",
  };

  const mobile_updated = {
    en: "Mobile number changed successfully!",
  };

  const password_changed = {
    en: "Password updated successfully",
  };

  const maxLength = function (name) {
    return {
      en: `${name} exceeded the character limit!`,
    };
  };

  const required = function (name) {
    return {
      en: `${name} is required!`,
    };
  };

  const invalid_token = {
    en: "Invalid token!",
  };

  const ac_deactivated = {
    en: "Your account is deactivated by admin!",
  };

  const unauthorized = {
    en: "You do not have permission to make changes.",
  };

  const mobile_exist = {
    en: "Entered mobile number already registered, Please change and try again!",
  };

  const email_exist = {
    en: "Email already registered, Please change and try again!",
  };

  const users_list = {
    en: "Users list",
  };

  const logout = {
    en: "Logout successfully",
  };

  const success = {
    en: "success",
  };

  const failure = {
    en: "failure",
  };

  return {
    required,
    maxLength,
    profile_complete: profile_complete[lang],
    user_added: user_added[lang],
    failure: failure[lang],
    success: success[lang],
    token_generated: token_generated[lang],
    logout: logout[lang],
    users_list: users_list[lang],
    invalid_token: invalid_token[lang],
    ac_deactivated: ac_deactivated[lang],
    unauthorized: unauthorized[lang],
    mobile_exist: mobile_exist[lang],
    email_exist: email_exist[lang],
    user_details: user_details[lang],
    profile_changed: profile_changed[lang],
    user_not_found: user_not_found[lang],
    user_already_found: user_already_found[lang],
    incorrect_password: incorrect_password[lang],
    incorrect_current_password: incorrect_current_password[lang],
    otp_sent: otp_sent[lang],
    otp_sent_on_mail: otp_sent_on_mail[lang],
    incorrect_otp: incorrect_otp[lang],
    otp_not_verified: otp_not_verified[lang],
    otp_verified: otp_verified[lang],
    mobile_updated: mobile_updated[lang],
    password_changed: password_changed[lang],
  };
};
