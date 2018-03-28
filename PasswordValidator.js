/**
 * Creates a password Validator
 *
 * @constructor
 */
function PasswordValidator() {
  this.errors = [];
  // Initialize a schema with no properties defined
}

/**
 * Checks against commons passwords list
 *
 * @param {string} [password] - password in the form of a string
 * @param {commonPasswordsObj} [object] - object with keys as common passwords and values as boolean true
 */
PasswordValidator.prototype.checkCommonPasswords = function(password, commonPasswordsObj) {
  if (commonPasswordsObj[password]) {
    this.errors.push('Too Common');
  }

  return this;
}

/**
 * Checks for non-ASCI characters
 *
 * @param {string} [password] - password in the form of a string
 */
PasswordValidator.prototype.checkisASCII = function(password) {
  function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
  }

  if (!isASCII(password)) {
    this.errors.push('contains non-ASCII');
  } 

  return this;
}

/**
 * Checks for minimum length
 *
 * @param {string} [password] - password in the form of a string
 * @param {number} [password] - numerical minimum length
 */
PasswordValidator.prototype.minLength = function(password, min) {
  if (password.length <= min - 1) {
    this.errors.push('Too short');
  } 
  return this;
}

/**
 * Checks for maximum length
 *
 * @param {string} [password] - password in the form of a string
 * @param {number} [password] - numerical max length
 */
PasswordValidator.prototype.maxLength = function(password, max) {
  if (password.length >= max - 1) {
    this.errors.push('Too long');
  } 
  return this;
}


module.exports = PasswordValidator;