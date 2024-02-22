"use strict";

var userModel = require("../Models/UserModel");

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var _require = require("../Config/mailer"),
    sendMail = _require.sendMail,
    SendOtp = _require.SendOtp;

var SignUp = function SignUp(req, res, next) {
  var _req$body, FullName, Email, Password, validateUser, hashPassword, createUser;

  return regeneratorRuntime.async(function SignUp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, FullName = _req$body.FullName, Email = _req$body.Email, Password = _req$body.Password;

          if (!(!FullName || !Email || !Password)) {
            _context.next = 4;
            break;
          }

          res.status(400);
          return _context.abrupt("return", next(new Error("All Fields are mandatory")));

        case 4:
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(userModel.findOne({
            Email: Email
          }));

        case 7:
          validateUser = _context.sent;

          if (validateUser) {
            res.status(400).send({
              message: "User Already Exists"
            });
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.hash(Password, 10));

        case 11:
          hashPassword = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(userModel.create({
            FullName: FullName,
            Email: Email,
            Password: hashPassword
          }));

        case 14:
          createUser = _context.sent;

          if (!createUser) {
            _context.next = 20;
            break;
          }

          sendMail(Email, FullName);
          res.status(200).send({
            message: "Account Created Successfully for ".concat(createUser.FullName),
            status: "success"
          });
          _context.next = 22;
          break;

        case 20:
          res.status(400);
          return _context.abrupt("return", next(new Error("Unable to create user's account")));

        case 22:
          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](4);
          res.status(500);
          return _context.abrupt("return", next(new Error("Internal Server Error")));

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 24]]);
};

var Login = function Login(req, res) {
  var _req$body2, Email, Password, validateUser, comparePassword, secretKey, generateToken;

  return regeneratorRuntime.async(function Login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, Email = _req$body2.Email, Password = _req$body2.Password;

          if (!Email || !Password) {
            res.status(400).send({
              message: "All Fields Are Mandatory"
            });
          }

          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(userModel.findOne({
            Email: Email
          }));

        case 5:
          validateUser = _context2.sent;

          if (validateUser) {
            _context2.next = 10;
            break;
          }

          res.status(400).send({
            message: "Account Does Not Exist, Try Creating one!",
            status: false
          });
          _context2.next = 18;
          break;

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(bcrypt.compare(Password, validateUser.Password));

        case 12:
          comparePassword = _context2.sent;
          secretKey = process.env.SECRET_KEY;
          _context2.next = 16;
          return regeneratorRuntime.awrap(jwt.sign({
            user: {
              FullName: validateUser.FullName,
              Email: validateUser.Email
            }
          }, secretKey, {
            expiresIn: "1d"
          }));

        case 16:
          generateToken = _context2.sent;

          if (comparePassword) {
            res.status(200).send({
              message: "Welcome  ".concat(validateUser.FullName),
              generateToken: generateToken,
              status: "success"
            });
          }

        case 18:
          _context2.next = 22;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](2);

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 20]]);
};

var EditAcc = function EditAcc(req, res) {
  var user, _req$body3, FullName, Email, Password;

  return regeneratorRuntime.async(function EditAcc$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = req.user;
          console.log("userEmail : ", user.Email);
          console.log("User Trying To Edit Acc : ", user);
          _req$body3 = req.body, FullName = _req$body3.FullName, Email = _req$body3.Email, Password = _req$body3.Password;

          if (!FullName || !Email || !Password) {
            res.status(400).send({
              message: "All Fields are mandatory"
            });
          } else {
            res.status(200).send({
              message: "Editing account"
            });
          }

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getCurrentUser = function getCurrentUser(req, res) {
  var user, fetchCurrentUser, userDetails;
  return regeneratorRuntime.async(function getCurrentUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = req.user;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(userModel.findOne({
            Email: user.Email
          }));

        case 4:
          fetchCurrentUser = _context4.sent;

          if (fetchCurrentUser) {
            userDetails = {
              FullName: fetchCurrentUser.FullName,
              Email: fetchCurrentUser.Email
            };
            res.status(200).send({
              message: "User userDetails",
              userDetails: userDetails
            });
          }

          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          res.status(500).send({
            message: "Internal Server Error"
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

var getOtp = function getOtp() {
  var user, getUser, generateRandum;
  return regeneratorRuntime.async(function getOtp$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          user = req.user;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(userModel.findOne({
            Email: user.Email
          }));

        case 4:
          getUser = _context5.sent;

          if (getUser) {
            generateRandum = Math.floor(Math.random() * 9999);
            console.log("Random Number : ", generateRandum);
            SendOtp(generateRandum, getUser.FullName, getUser.Email);
          }

          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          res.status(500).send({
            message: "Internal Server Error"
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

module.exports = {
  SignUp: SignUp,
  Login: Login,
  EditAcc: EditAcc,
  getCurrentUser: getCurrentUser,
  getOtp: getOtp
};