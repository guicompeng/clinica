// validations.js
const { validationResult } = require("express-validator");

const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // Chama o próximo middleware se não houver erros de validação
};

module.exports = {
  checkValidationResult,
};