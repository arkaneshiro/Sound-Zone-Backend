'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follows = sequelize.define('Follows', {
    followerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    followedId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Follows.associate = function(models) {
    Follows.belongsTo(models.User);
  };
  return Follows;
};
