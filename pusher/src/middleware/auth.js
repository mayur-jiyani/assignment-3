const jwt = require("jsonwebtoken");
const User = require("../model/users");
const logger = require("../logger");
const axios = require("axios");

const auth = async (req, resp, next) => {
  // var token, user;
  var user;
  var token = req.header("Authorization").replace("Bearer ", "");
  try {
    await axios
      .post("http://127.0.0.1:3002/authentication/middleware", { token })
      .then((response) => {
        if (response.data) {
          token = response.data.token;
          user = response.data.user;
          flag = true;
        } else {
          return resp.status(401).send({ error: "Please authenticate" });
        }
      })
      .catch((error) => {
        logger.error(error);
        console.log(error);
        return resp.status(401).send({ error: error });
        // throw new Error(error);
      });

    if (flag) {
      req.token = token;
      req.user = user;
    } else {
      return resp.status(401).send({ error: "Please authenticate" });
    }

    next();
  } catch (e) {
    logger.error(e);
    resp.status(401).send({ error: e });
  }
};

module.exports = auth;
