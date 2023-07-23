'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.addColumn('audit_trail', 'role_id', {
            type: Sequelize.DataTypes.INTEGER
        });
    },

    async down (queryInterface) {
        await queryInterface.removeColumn('audit_trail', 'role_id');
    }
};
