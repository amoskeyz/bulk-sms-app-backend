module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .addColumn('Users', 'senderId', {
      type: Sequelize.STRING,
      defaultValue: null
    })
    .then(() => queryInterface.addColumn('Users', 'emailNotification', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }))
    .then(() => queryInterface.addColumn('Users', 'inAppNotification', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }))
    .then(() => queryInterface.addColumn('Users', 'reminder', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }))
    .then(() => queryInterface.addColumn('Users', 'delivery', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    })),

  down: queryInterface => queryInterface
    .removeColumn('Users', 'senderId')
    .then(() => queryInterface.removeColumn('Users', 'emailNotification'))
    .then(() => queryInterface.removeColumn('Users', 'inAppNotification'))
    .then(() => queryInterface.removeColumn('Users', 'reminder'))
    .then(() => queryInterface.removeColumn('Users', 'delivery'))
};
