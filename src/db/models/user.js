import bcrypt from 'bcryptjs';
import { getToken } from '../../utils';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    creditUnit: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password = !user.social
          ? await bcrypt.hash(user.password, 10)
          : null;
      }
    },
  });
  User.associate = (models) => {
    // associations can be defined here
  };
  User.prototype.passwordsMatch = function match(password) {
    return bcrypt.compare(password, this.password);
  };
  User.prototype.response = function response(addToken = true) {
    const userData = {
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      id: this.id
    };
    if (addToken) userData.token = getToken(this.id, this.email);
    return userData;
  };

  return User;
};
