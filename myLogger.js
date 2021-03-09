
const moment = require("moment");

//simple middleware
const logger = (req, res, next) => {
    //returns url
    console.log(
      `MY LOGGER ${req.protocol}://${req.get("host")}${
        req.originalUrl
      }:${moment().format()}`
    );
    next();
  };

module.exports = logger;