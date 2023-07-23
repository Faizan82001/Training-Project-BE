'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('document', {
            run_no: {
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER
            },
            face_sheet: Sequelize.DataTypes.STRING,
            pcs: Sequelize.DataTypes.STRING,
            aob: Sequelize.DataTypes.STRING,
            other_1: Sequelize.DataTypes.STRING,
            other_2: Sequelize.DataTypes.STRING,
            other_3: Sequelize.DataTypes.STRING,
            other_4: Sequelize.DataTypes.STRING,
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
        await queryInterface.dropTable('document');
    }
};
