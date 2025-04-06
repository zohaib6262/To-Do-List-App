"use strict";
const bcrypt = require("bcryptjs");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, {
        foreignKey: "userId",
        as: "todos",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Username cannot be empty",
          },
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Full name cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Must be a valid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      resetTokenExpiry: {
        type: DataTypes.DATE,
        defaultValue: () => {
          return new Date(Date.now() + 3600 * 1000);
        },
      },
      userProfile: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: false,
      },

      userType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "default",
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );
  return User;
};
