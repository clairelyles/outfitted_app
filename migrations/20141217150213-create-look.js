"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("looks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      outfitId: {
        type: DataTypes.INTEGER
      },
      pieceId: {
        type: DataTypes.INTEGER
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
    migration.dropTable("looks").done(done);
  }
};