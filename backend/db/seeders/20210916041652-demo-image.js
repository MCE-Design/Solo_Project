'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        url:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Baggins_residence_%27Bag_End%27_with_party_sign.jpg/800px-Baggins_residence_%27Bag_End%27_with_party_sign.jpg'
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
