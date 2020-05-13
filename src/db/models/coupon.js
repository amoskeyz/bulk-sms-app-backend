module.exports = (sequelize, DataTypes) => {
  const coupon = sequelize.define('Coupon', {
    code: DataTypes.STRING,
    amount: DataTypes.STRING,
    users: DataTypes.ARRAY(DataTypes.TEXT),
    count: DataTypes.INTEGER,
    isExpired: DataTypes.BOOLEAN
  }, {});
  coupon.associate = (models) => {
    // associations can be defined here
  };
  return coupon;
};
