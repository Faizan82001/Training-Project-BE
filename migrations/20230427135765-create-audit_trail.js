'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('audit_trail', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true
            },
            first_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            run_no: {
                type: Sequelize.DataTypes.INTEGER
            },
            status: {
                type: Sequelize.DataTypes.STRING
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    async down (queryInterface) {
        await queryInterface.dropTable('audit_trail');
    }
};

