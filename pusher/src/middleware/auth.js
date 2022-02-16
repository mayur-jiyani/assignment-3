const jwt = require("jsonwebtoken");
const User = require("../model/users");
const logger = require("../logger");
const axios = require("axios");

const auth = async (req, resp, next) => {
  // var token, user;
  var user;
  var flag = true;

  var token = req.header("Authorization").replace("Bearer ", "");

  try {
    await axios
      .post("http://127.0.0.1:3002/authentication/middleware", { token })
      .then((response) => {
        console.log("1");
        if (response.data != " ") {
          console.log(response.data);
          token = response.data.token;
          user = response.data.user;
          req.token = token;
          req.user = user;
          flag = false;
        } else {
          return;
        }
      })
      .catch((error) => {
        logger.error(error);
        console.log(error);
        return resp.status(401).send({ error: error });
        // throw new Error(error);
      });
  } catch (e) {
    logger.error(e);
    resp.status(401).send({ error: e });
  }

  if (flag) {
    return resp.status(401).send({ error: "Please authenticate" });
  }
  next();
};

module.exports = auth;
