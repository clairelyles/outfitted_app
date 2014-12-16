"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("piecesoutfits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      pieceId: {
        type: DataTypes.INTEGER
      },
      outfitId: {
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
    migration.dropTable("piecesoutfits").done(done);
  }
};