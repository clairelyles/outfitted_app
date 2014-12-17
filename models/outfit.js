"use strict";

module.exports = function(sequelize, DataTypes) {
  var outfit = sequelize.define("outfit", {
    tagId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // models.outfit.hasMany(models.piece)
        // models.outfit.belongsTo(models.piece)
        models.outfit.belongsTo(models.tag)
      }
    }
  });

  return outfit;
};
