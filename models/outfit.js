"use strict";

module.exports = function(sequelize, DataTypes) {
  var outfit = sequelize.define("outfit", {
    tagId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.outfit.hasMany(models.look)
        models.outfit.hasMany(models.piece,{through:models.look})
        models.outfit.belongsTo(models.tag)
      }
    }
  });

  return outfit;
};
