module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Phonebooks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    contacts: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    name: {
      type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Phonebooks')
};
