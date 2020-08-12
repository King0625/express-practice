'use strict';
const bcrypt = require('bcrypt');
const randomString = require('crypto-random-string');
const rawUserDatas = [
  {
    name: "admin",
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('12345678', 10),
    api_token: randomString({length: 50}),
    admin: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Ken",
    email: 'kenme@gmail.com',
    password: bcrypt.hashSync('12345678', 10),
    api_token: randomString({length: 50}),
    admin: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Kyle",
    email: 'kyle@gmail.com',
    password: bcrypt.hashSync('12345678', 10),
    api_token: randomString({length: 50}),
    admin: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Users', rawUserDatas, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
