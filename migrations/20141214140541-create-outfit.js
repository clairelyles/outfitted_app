"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("outfits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      tagId: {
        type: DataTypes.INTEGER
      },
      comment: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("outfits").done(done);
  }
};