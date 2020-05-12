'use strict';
module.exports = (sequelize, DataTypes) => {
  const SoundGenre = sequelize.define('SoundGenre', {
    soundId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    genreId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  SoundGenre.associate = function(models) {
    SoundGenre.belongsTo(models.Sound, {
      foreignKey: 'soundId'
    });
    SoundGenre.belongsTo(models.Genre, {
      foreignKey: 'genreId'
    });
  };
  return SoundGenre;
};
