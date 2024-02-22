"use strict";

var nodemailer = require("nodemailer");

var sendMail = function sendMail(Email, FullName) {
  var contactTemplate, transporter, mailOptions;
  return regeneratorRuntime.async(function sendMail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          contactTemplate = "<div>\n    <div>\n      <h2 style=\"color: #00a859;\">Welcome to Stackplus Technology</h2>\n    </div>\n    <ul>\n      <li>Name: ".concat(FullName, "</li>\n      <li>Email: ").concat(Email, "</li>\n    </ul>\n    <div>\n      <p>\n        Dear ").concat(FullName, ",\n      </p>\n      <p>\n        Welcome to our community! We are thrilled to have you on board.\n      </p>\n      <p>\n        With your new account, you can explore all the features our website has to offer.\n      </p>\n      <p>\n        If you have any questions or need assistance, feel free to contact us.\n      </p>\n    </div>\n    <p style=\"color: #00a859;\"><i>Stackplus Technology</i></p>\n  </div>\n");
          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.GMAIL,
              pass: process.env.PASS
            }
          }); //   transporter.verify(function (error, success) {
          //     if (error) {
          //       console.error("Transporter verification failed:", error);
          //     } else {
          //       console.log("Transporter is ready to send messages");
          //     }
          //   });

          mailOptions = {
            from: process.env.GOOGLE_EMAIL,
            to: Email,
            subject: "Welcome to Hello World Community",
            html: contactTemplate,
            text: "Hello World Community"
          };
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 6:
          console.log("Email Sent Successfully");
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](3);
          console.error("Error sending email:", _context.t0);
          throw _context.t0;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 9]]);
};

var SendOtp = function SendOtp(Otp, FullName, Email) {
  var contactTemplate, transporter, mailOptions;
  return regeneratorRuntime.async(function SendOtp$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          contactTemplate = "<div>\n      <div>\n        <h2 style=\"color: brown;\">ForgotPassword Request</h2>\n      </div>\n      <ul>\n        <li>Name: ".concat(FullName, "</li>\n        <li>Email: ").concat(Email, "</li>\n      </ul>\n      <div>\n        <p>\n          Dear ").concat(FullName, ",\n        </p>\n        <p>\n         We Received Your request for a password reset.\n        </p>\n        <p>\n            Your OTP is: ").concat(Otp, "\n        </p>\n        <p>\n          If you have any questions or need assistance, feel free to contact us.\n        </p>\n      </div>\n      <p style=\"color: #brown;\"><i>Stackplus Technology</i></p>\n    </div>\n  ");
          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.GOOGLE_EMAIL,
              pass: process.env.GOOGLE_PASSWORD
            }
          }); //   transporter.verify(function (error, success) {
          //     if (error) {
          //       console.error("Transporter verification failed:", error);
          //     } else {
          //       console.log("Transporter is ready to send messages");
          //     }
          //   });

          mailOptions = {
            from: process.env.GOOGLE_EMAIL,
            to: Email,
            subject: "Forgot Password Request",
            html: contactTemplate,
            text: "Hello World Community"
          };
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 6:
          console.log("Email Sent Successfully");
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](3);
          console.error("Error sending email:", _context2.t0);
          throw _context2.t0;

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 9]]);
};

module.exports = {
  sendMail: sendMail,
  SendOtp: SendOtp
};