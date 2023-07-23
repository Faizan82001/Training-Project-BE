'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'user',
            'fcm_token',
            {
                type: Sequelize.STRING,
                allowNull: true
            }
        );
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('user', 'fcm_token');
    }
};
