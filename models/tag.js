"use strict";

module.exports = function(sequelize, DataTypes) {
  var tag = sequelize.define("tag", {
    tag_name: DataTypes.STRING,
    tagline: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.tag.hasMany(models.outfit)
      }
    }
  });

  return tag;
};
