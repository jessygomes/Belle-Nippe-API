const PasswordValidator = require("password-validator");

// Create a schema
const schema = new PasswordValidator();

// Add properties to it
schema
  .is()
  .min(12) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2); // Must have at least 2 digits

module.exports = schema;
