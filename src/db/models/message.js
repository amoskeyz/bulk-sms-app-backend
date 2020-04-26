module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    sender: DataTypes.STRING,
    recipient: DataTypes.TEXT,
    text: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    // description: DataTypes.TEXT,
    // phone: DataTypes.ARRAY(DataTypes.STRING),
  }, {});
  Message.associate = (models) => {
    // associations can be defined here
  };
  return Message;
};
