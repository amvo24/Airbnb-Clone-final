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
        previewImage: "https://images.unsplash.com/photo-1534450539339-6d1c81ad18e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=786&q=80",
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
        previewImage: "https://images.unsplash.com/photo-1618945373370-7bde4f8dd9c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80",
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
        previewImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
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
