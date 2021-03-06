'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {});
  Genre.associate = function(models) {
    // associations can be defined here
  };
  return Genre;
};
