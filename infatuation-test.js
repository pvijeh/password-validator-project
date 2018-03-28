var async = require('async')
var PasswordValidator = require('./PasswordValidator');

// Read the file and print its contents.
const fs = require('fs'),
  filename = process.argv[2],
  commonPasswords = process.argv[3];
  const files = [filename, commonPasswords];

async.map(files, fs.readFile, function(err, files) {
  let commonPasswordsObj = {};
  
  if(err) {
    throw err;
  }

  const inputPasswords = files[0].toString('utf8').split("\n");
  const commonPasswords = files[1].toString('utf8').split("\n");

  commonPasswords.forEach( password => {
    commonPasswordsObj[password] = true;
  })

  inputPasswords.forEach(password => {
    const validator = new PasswordValidator();

    validator.checkCommonPasswords(password, commonPasswordsObj)
    .checkisASCII(password)
    .minLength(password, 8)
    .maxLength(password, 64);

    if (validator.errors.length > 0) {
      console.log(password, '-> Error:', validator.errors.join(', '));
    } else {
      console.log(password, '-> is valid');
    }
  })
});



