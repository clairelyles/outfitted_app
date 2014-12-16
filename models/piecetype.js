"use strict";

module.exports = function(sequelize, DataTypes) {
  var piecetype = sequelize.define("piecetype", {
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.piecetype.hasMany(models.piece)
      }
    }
  });

  return piecetype;
};
