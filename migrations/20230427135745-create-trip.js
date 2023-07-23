'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('trip', {
            run_no: {
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'document',
                    key: 'run_no'
                }
            },
            service_type: {
                type: Sequelize.DataTypes.ENUM('ALS', 'BLS', 'CCT')
            },
            creator_id: {
                type: Sequelize.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            assignee: {
                type: Sequelize.DataTypes.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            exception_message: {
                type: Sequelize.DataTypes.STRING
            },
            status: {
                type: Sequelize.DataTypes.ENUM(
                    'New Request',
                    'Assigned for Review',
                    'Request more Information',
                    'Data Provided',
                    'Approved',
                    'Approved with Exception'
                ),
                defaultValue: 'New Request'
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
        await queryInterface.dropTable('trip');
    }
};
