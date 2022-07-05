'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      review: {
        type: Sequelize.STRING
      },
      stars: {
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'spots',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};
