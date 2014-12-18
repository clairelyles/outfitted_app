"use strict";

module.exports = function(sequelize, DataTypes) {
  var piece = sequelize.define("piece", {
    piecetypeId: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        models.piece.belongsTo(models.user)
        models.piece.belongsTo(models.piecetype)
        // models.piece.belongsTo(models.outfit)
        models.piece.hasMany(models.outfit,{through:models.look})
      }
    }
  });

  return piece;
};
