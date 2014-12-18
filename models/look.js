"use strict";

module.exports = function(sequelize, DataTypes) {
  var look = sequelize.define("look", {
    outfitId: DataTypes.INTEGER,
    pieceId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.look.belongsTo(models.outfit);
      }
    }
  });

  return look;
};
