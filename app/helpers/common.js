const Response = function (message, result, success) {
    return { message, result: result == null ? {} : (result), success };
  };
  module.exports = {
    Response}
  