'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        userId: 2,
        address: '70 Road North',
        city: 'Orondo',
        state: 'Washington',
        country: 'United States',
        lat: '47.814607',
        lng: '-119.923947',
        name: 'Bag End',
        price: '400.00'
      },
      {
        userId: 3,
        address: 'South Fjallabak Road',
        city: 'Hvolsvöllur',
        state: 'Höfuðborgarsvæðið',
        country: 'Iceland',
        lat: '63.7994869',
        lng: '-18.9383698',
        name: 'Barad-dûr',
        price: '1000000.00'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', null, { truncate: true, cascade: true });
  }
};
