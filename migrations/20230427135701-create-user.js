'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID
            },
            first_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                unique: true,
                isEmail: true,
                allowNull: false
            },
            password: {
                type: Sequelize.DataTypes.STRING
            },
            role_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'role',
                    key: 'id'
                }
            },
            status: {
                type: Sequelize.DataTypes.ENUM('invited', 'active', 'inactive'),
                defaultValue: 'invited'
            },
            token: Sequelize.DataTypes.STRING,
            expiry_date: Sequelize.DATE,
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
        await queryInterface.dropTable('user');
    }
};
