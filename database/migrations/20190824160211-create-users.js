export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      first_name: { allowNull: false, type: Sequelize.STRING(100) },
      first_last: { allowNull: false, type: Sequelize.STRING(100) },
      email: { allowNull: false, type: Sequelize.STRING(100), unique: true },
      year_birth: { type: Sequelize.INTEGER },
      password_hash: { allowNull: false, type: Sequelize.STRING(255) },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};
