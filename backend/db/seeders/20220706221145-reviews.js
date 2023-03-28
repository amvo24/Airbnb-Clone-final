'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        firstName: 'andrew',
        lastName: 'vo',
        review: 'I did not like this place. It scared me.',
        stars: 2,
        spotId: 2,
        userId: 1
      },
      {
        firstName: 'andrew',
        lastName: 'vo',
        review: 'I did love this place.',
        stars: 5,
        spotId: 1,
        userId: 1
      },
      {
        firstName: 'andrew',
        lastName: 'vo',
        review: 'this place was ok.',
        stars: 3,
        spotId: 3,
        userId: 1
      },
      {
        firstName: 'Alice',
        lastName: 'Smith',
        review: 'I had a great time at this place. The location was perfect and the amenities were top-notch!',
        stars: 4,
        spotId: 3,
        userId: 5
      },
      {
        firstName: 'Bob',
        lastName: 'Johnson',
        review: 'This place exceeded my expectations. The decor was stylish and modern, and the host was very friendly and accommodating.',
        stars: 5,
        spotId: 7,
        userId: 6
      },
      {
        firstName: 'Charlie',
        lastName: 'Lee',
        review: 'I highly recommend this spot to anyone looking for a cozy and relaxing getaway. The views are breathtaking and the atmosphere is so serene.',
        stars: 4,
        spotId: 10,
        userId: 7
      },
      {
        firstName: 'Diana',
        lastName: 'Brown',
        review: 'I had a wonderful experience staying at this place. The host was so kind and welcoming, and the space was clean and comfortable.',
        stars: 5,
        spotId: 13,
        userId: 8
      },
      {
        firstName: 'Ethan',
        lastName: 'Davis',
        review: 'This spot is truly a hidden gem. The location is unbeatable and the amenities are top-notch. I can\'t wait to come back!',
        stars: 4,
        spotId: 15,
        userId: 9
      }


    ])
  },


  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      id: { [Op.in]: [1, 2] }
    });
  }
};
