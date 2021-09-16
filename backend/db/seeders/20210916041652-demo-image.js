'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        url:'https://static.wikia.nocookie.net/lotr/images/e/e4/Vlcsnap-2013-05-19-19h49m07s0.png'
      },
      {
        spotId: 1,
        url:'https://apilgriminnarnia.files.wordpress.com/2012/12/bag-end-inside-hobbit.jpg'
      },
      {
        spotId: 1,
        url:'https://madshobbithole.files.wordpress.com/2010/01/111.jpg'
      },
      {
        spotId: 2,
        url:'http://www.thedart.co/wp-content/uploads/2021/07/barad-dur.jpeg'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
