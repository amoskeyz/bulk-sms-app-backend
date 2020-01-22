module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    sender: DataTypes.STRING,
    recipient: DataTypes.STRING,
    text: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Message.associate = (models) => {
    // associations can be defined here
  };
  return Message;
};
