export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      first_name: { allowNull: false, type: Sequelize.STRING(100) },
      last_name: { allowNull: false, type: Sequelize.STRING(100) },
      email: { allowNull: false, type: Sequelize.STRING(100), unique: true },
      password: { allowNull: false, type: Sequelize.STRING(255) },
      salt_rounds: { type: Sequelize.INTEGER, defaultValue: 10 },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};
