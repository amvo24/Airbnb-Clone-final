'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Images', [
      {

        imageableId: 1,
        imageableType: "Spot",
        url: 'https://media.architecturaldigest.com/photos/568ef57c02bad8496774de87/16:9/w_4256,h_2394,c_limit/1_WebEstate_Kailua,%20Hawaii%20.jpg',
        //reviewId: 2,
        spotId: 1
      },
      {

        imageableId: 2,
        imageableType: "Spot",
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
        //reviewId: 2,
        spotId: 1
      },
      {

        imageableId: 3,
        imageableType: "Spot",
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=958&q=80',
        //reviewId: 2,
        spotId: 1
      },
      {

        imageableId: 4,
        imageableType: "Spot",
        url: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        //reviewId: 2,
        spotId: 1
      },
      {

        imageableId: 5,
        imageableType: "Review",
        url: 'https://i.pinimg.com/originals/c7/58/43/c7584365f991ea6236fd1f19653f06a2.jpg',
        reviewId: 2,
        spotId: 2
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      id: { [Op.in]: [1, 2] }
    });
  }
};
