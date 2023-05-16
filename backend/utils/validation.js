// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) { 
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const handleSpotValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) { 
    const errors = {};
    validationErrors
      .array()
      .forEach(error => {
        errors[error.path] = error.msg 
        
      });
      
      
      const err = Error("Validation Error");
      err.message = "Validation Error"
      err.errors = errors;
      res.status(400);
      return res.json({
        message: err.message,
        // statusCode: res.statusCode,
        errors: err.errors
      })
    }
    next()
};

module.exports = {
  handleValidationErrors,
  handleSpotValidationErrors
};