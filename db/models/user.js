'use strict';
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50)
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(100),
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    },
    bio: {
      allowNull: false,
      type: DataTypes.STRING
    },
    imgUrl: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Sound, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Follows, {
      foreignKey: 'followerId',
      foreignKey: 'followedId'
    })
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return User;
};
