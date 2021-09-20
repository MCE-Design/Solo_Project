'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        userName: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'BBaggins@theshire.com',
        userName: 'BilboBaggins',
        hashedPassword: bcrypt.hashSync('adventure'),
      },
      {
        email: 'Sauron@mordor.net',
        userName: 'Sauron',
        hashedPassword: bcrypt.hashSync('aaAA11!!'),
      },
      {
        email: 'Frodo@theshire.com',
        userName: 'FrodoBaggins',
        hashedPassword: bcrypt.hashSync('adventure'),
      },
      {
        email: 'Gimli@thefellowship.com',
        userName: 'Gimli',
        hashedPassword: bcrypt.hashSync('fellowship'),
      },
      {
        email: 'Thorin@thorinandco.com',
        userName: 'ThorinOakenshield',
        hashedPassword: bcrypt.hashSync('thecompany'),
      },
      {
        email: 'Bombur@thorinandco.com',
        userName: 'Bombur',
        hashedPassword: bcrypt.hashSync('thecompany'),
      },
      {
        email: faker.internet.email(),
        userName: 'FakeUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        userName: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
