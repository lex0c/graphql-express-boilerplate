import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      validate: { min: 2 },
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      validate: { min: 2 },
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      field: 'password',
      validate: { min: 6 },
    },
    saltRounds: {
      type: DataTypes.INTEGER,
      field: 'salt_rounds',
      validate: { isInt: true },
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      validate: { isDate: true },
    },
  }, { sequelize });

  User.beforeCreate(async ({ dataValues }) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const phash = await bcrypt.hash(dataValues.password, saltRounds);
    dataValues.password = phash;
    dataValues.saltRounds = saltRounds;
    return dataValues;
  });

  return User;
};
