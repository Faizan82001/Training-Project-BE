'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('issues', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true
            },
            nurse_id: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE
            },
            updated_at: {
                type: Sequelize.DATE
            }
        });
        await queryInterface.sequelize.query('SELECT setval(\'issues_id_seq\', 100000, true);');
    },
    async down (queryInterface) {
        await queryInterface.dropTable('issues');
    }
};
