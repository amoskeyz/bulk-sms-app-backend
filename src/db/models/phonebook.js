module.exports = (sequelize, DataTypes) => {
  const Phonebook = sequelize.define('Phonebook', {
    userId: DataTypes.INTEGER,
    contacts: DataTypes.ARRAY(DataTypes.TEXT),
    name: DataTypes.STRING
  }, {});
  Phonebook.associate = (models) => {
    // associations can be defined here
  };
  return Phonebook;
};
