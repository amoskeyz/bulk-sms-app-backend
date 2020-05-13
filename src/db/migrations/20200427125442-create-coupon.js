module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Coupons', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    code: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.STRING
    },
    count: {
      type: Sequelize.INTEGER
    },
    users: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    isExpired: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('coupons')
};
