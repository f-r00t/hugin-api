'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      key: {
        type: Sequelize.STRING,
        allowNull: true
      },
      signature: {
        type: Sequelize.STRING,
        allowNull: true
      },
      board: {
        type: Sequelize.STRING,
        allowNull: true
      },
      time: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tx_hash: {
        type: Sequelize.STRING,
        allowNull: true
      },
      reply: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('post');
  }
};
