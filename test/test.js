const {assert, expect} = require('chai');
const PasswordValidator = require('../PasswordValidator');

const commonPasswords = {
  b12345: true,
}

describe('passwordValidator.checkCommonPasswords', function() {
  let passwordValidator = null;

   beforeEach(function() {
    passwordValidator = new PasswordValidator(); 
  });

  it('should not add an error for password not in commonPassword map', function() {
    passwordValidator.checkCommonPasswords('notcommon', commonPasswords)
    expect(passwordValidator.errors).to.have.length(0);
  });

  it('should add an error for password in commonPassword map', function() {
    passwordValidator.checkCommonPasswords('b12345', commonPasswords)
    expect(passwordValidator.errors).to.have.length(1);
  });
});

describe('passwordValidator.checkisACII', function() {
  let passwordValidator = null;

   beforeEach(function() {
    passwordValidator = new PasswordValidator(); 
  });

  it('should not add an error for password not in commonPassword map', function() {
    passwordValidator.checkisASCII('password')
    expect(passwordValidator.errors).to.have.length(0);
  });

  it('should add an error if non-ASCII', function() {
    passwordValidator.checkisASCII('®b12345')
    expect(passwordValidator.errors).to.have.length(1);
  });
});

describe('passwordValidator.minLength', function() {
  let passwordValidator = null;

   beforeEach(function() {
    passwordValidator = new PasswordValidator(); 
  });

  it('should not add error for lengthy enough passwords', function() {
    passwordValidator.minLength('12345678', 8)
    expect(passwordValidator.errors).to.have.length(0);
  });

  it('should add error for too short passwords', function() {
    passwordValidator.minLength('345', 8)
    expect(passwordValidator.errors).to.have.length(1);
  });
});

describe('passwordValidator.maxLength', function() {
  let passwordValidator = null;

   beforeEach(function() {
    passwordValidator = new PasswordValidator(); 
  });

  it('should not add error for lengthy enough passwords', function() {
    passwordValidator.maxLength('12345678', 64)
    expect(passwordValidator.errors).to.have.length(0);
  });

  it('should add error for too short passwords', function() {
    passwordValidator.maxLength('11199294959111992942444jhhhh94959111992949591119929412949fkfkfk9111', 64)
    expect(passwordValidator.errors).to.have.length(1);
  });
});





