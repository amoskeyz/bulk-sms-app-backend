module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    method: DataTypes.STRING,
    amount: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  Transaction.associate = (models) => {
    // associations can be defined here
  };
  return Transaction;
};
