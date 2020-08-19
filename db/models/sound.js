'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sound = sequelize.define('Sound', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    soundUrl: {
      allowNull: false,
      type: DataTypes.STRING
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING
    },
    waveUrl: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    playCount: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {});
  Sound.associate = function(models) {
    Sound.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Sound;
};
