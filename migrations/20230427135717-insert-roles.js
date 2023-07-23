'use strict';
module.exports = {
    up: function (queryInterface) {
        return queryInterface.bulkInsert('role', [
            {
                id: 1,
                role_name: 'Billing Manager'
            },
            {
                id: 2,
                role_name: 'Billing Admin'
            },
            {
                id: 3,
                role_name: 'Nurse'
            }
        ]);
    },
    down: function (queryInterface) {
        return queryInterface.bulkDelete('role', null, {});
    }
};
