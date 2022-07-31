'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        firstName: 'andrew',
        lastName: 'vo',
        review: 'I am user 1 and I did not like this place. It scared me.',
        stars: 2,
        spotId: 2,
        userId: 1
      },
      {
        firstName: 'andrew',
        lastName: 'vo',
        review: 'I am user 1 and I did love this place.',
        stars: 5,
        spotId: 1,
        userId: 1
      },
      {
        firstName: 'andrew',
        lastName: 'vo',
        review: 'I am user 1 and this place was ok.',
        stars: 3,
        spotId: 3,
        userId: 1
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
