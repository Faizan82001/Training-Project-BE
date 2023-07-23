'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.removeColumn('patient', 'diagnostics');
        await queryInterface.addColumn('patient', 'new_guarantor_weight', {
            type: Sequelize.DataTypes.FLOAT
        });
        await queryInterface.sequelize.query(`
            UPDATE patient
            SET new_guarantor_weight = CAST(guarantor_weight AS double precision)
          `);
        await queryInterface.removeColumn('patient', 'guarantor_weight');
        await queryInterface.renameColumn('patient', 'new_guarantor_weight', 'guarantor_weight');

        await queryInterface.addColumn('patient', 'new_guarantor_height', {
            type: Sequelize.DataTypes.FLOAT
        });
        await queryInterface.sequelize.query(`
            UPDATE patient
            SET new_guarantor_height = CAST(guarantor_height AS double precision)
          `);
        await queryInterface.removeColumn('patient', 'guarantor_height');
        await queryInterface.renameColumn('patient', 'new_guarantor_height', 'guarantor_height');
    },

    async down (queryInterface, Sequelize) {
        // no down action needed
    }
};
