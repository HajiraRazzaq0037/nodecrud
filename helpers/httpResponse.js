const okResponse = (statusCode, data, message) => {
  return {
    statusCode,
    message,
    error: false,
    data: data || null,
  };
};

const errorResponse = (statusCode, error, message) => {
  return {
    statusCode, // HTTP Status Code
    message, // One line message
    error, // Exception detail in development
    data: null, // Extra detail about error
  };
};

module.exports = {
  okResponse,
  errorResponse,
};
