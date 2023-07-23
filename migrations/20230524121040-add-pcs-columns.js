'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'patient',
            'pickup_location',
            {
                type: Sequelize.STRING
            }
        );
        await queryInterface.addColumn(
            'patient',
            'pickup_date_time',
            {
                type: Sequelize.DATE
            }
        );
        await queryInterface.addColumn(
            'patient',
            'transport_requested_by',
            {
                type: Sequelize.STRING
            }
        );
        await queryInterface.addColumn(
            'patient',
            'contact_number',
            {
                type: Sequelize.STRING
            }
        );
        await queryInterface.addColumn(
            'patient',
            'pickup_location_unit_room',
            {
                type: Sequelize.STRING
            }
        );
        await queryInterface.addColumn(
            'patient',
            'sending_md',
            {
                type: Sequelize.STRING
            }
        );
        await queryInterface.addColumn(
            'patient',
            'destination_address',
            {
                type: Sequelize.STRING
            }
        );
        await queryInterface.addColumn(
            'patient',
            'destination_address_unit_room',
            {
                type: Sequelize.STRING
            }
        );
        await queryInterface.addColumn(
            'patient',
            'accepting_md',
            {
                type: Sequelize.STRING
            }
        );
        await queryInterface.addColumn(
            'patient',
            'appointment_date_time',
            {
                type: Sequelize.DATE
            }
        );
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('patient', 'pickup_location');
        await queryInterface.removeColumn('patient', 'pickup_date_time');
        await queryInterface.removeColumn('patient', 'transport_requested_by');
        await queryInterface.removeColumn('patient', 'contact_number');
        await queryInterface.removeColumn('patient', 'pickup_location_unit_room');
        await queryInterface.removeColumn('patient', 'sending_md');
        await queryInterface.removeColumn('patient', 'destination_address');
        await queryInterface.removeColumn('patient', 'destination_address_unit_room');
        await queryInterface.removeColumn('patient', 'accepting_md');
        await queryInterface.removeColumn('patient', 'appointment_date_time');
    }
};
