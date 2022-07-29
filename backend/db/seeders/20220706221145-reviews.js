'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {

        review: 'I am user 1 and I did not like this place. It scared me.',
        stars: 2,
        spotId: 2,
        userId: 1
      },
      {

        review: 'I am user 1 and I did love this place.',
        stars: 5,
        spotId: 1,
        userId: 1
      },
      {

        review: 'I am user 1 and this place was ok.',
        stars: 3,
        spotId: 3,
        userId: 1
      },
      {

        review: 'I am user id 2 and I loved this place. Will be coming back soon!',
        stars: 5,
        spotId: 1,
        userId: 2
      },
      {

        review: 'I am user id 3 and I wanna move to this place, I loved it a lot!',
        stars: 5,
        spotId: 3,
        userId: 3
      },
    ])
  },


  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      id: { [Op.in]: [1, 2] }
    });
  }
};
