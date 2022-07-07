'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'App Academy',
        description: 'Place where web developers are created',
        price: 123,
        previewImage: null,
      },
      {
        ownerId: 2,
        address: '124 Universal Studios',
        city: 'Orlando',
        state: 'Florida',
        country: 'United States of America',
        lat: 50.7645358,
        lng: -150.4730327,
        name: 'Universal Studios',
        description: 'Fun place here',
        price: 150,
        previewImage: null,
      },
      {
        ownerId: 3,
        address: '1234 tokyo dr',
        city: 'Tokyo',
        state: 'Japan',
        country: 'Japan',
        lat: 45.7645358,
        lng: -250.4730327,
        name: 'random place',
        description: 'japanese place',
        price: 200,
        previewImage: null,
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      ownerId: { [Op.in]: [1, 2] }
    });
  }
};
