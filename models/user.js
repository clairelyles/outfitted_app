"use strict";
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          // min and max length for password
          args: [5,100],
          msg: 'Please enter a password at least 5 characters long'
        }
      }
    }, 
    first_name: DataTypes.STRING
    }, {
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.piece)
      }
    },
    hooks: {
      beforeCreate: function(data, garbage, sendback) {
      var passToEncrypt = data.password;
      var passToValidate = data.password2;
        bcrypt.hash(passToEncrypt, 10, function(err, hash) {
          data.password = hash;
          sendback(null, data);
        })
      }
    }
  })
  return user;
};
