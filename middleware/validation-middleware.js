const temp = (req, res, next) => {
  if (!req.query.city) {
    res.status(422).send({
      success: false,
      message: "missing parameters",
      data: null,
    });
  } else {
    next();
  }
};
const sevenDayForCast = (req, res, next) => {
  if (!req.query.latitude && !req.query.longitude) {
    res.status(422).send({
      success: false,
      message: "missing parameters",
      data: null,
    });
  } else {
    next();
  }
};

module.exports = {
  temp,
  sevenDayForCast,
};
