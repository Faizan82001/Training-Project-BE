'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.addColumn('trip', 'time_taken', {
            type: Sequelize.DataTypes.INTEGER
        });
    },

    async down (queryInterface) {
        await queryInterface.removeColumn('trip', 'time_taken');
    }
};
