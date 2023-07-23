'use strict';
module.exports = {
    up: function (queryInterface) {
        return queryInterface.bulkInsert('user', [
            {
                id: '8dfdcf58-52f7-4ec1-ba7f-93ec9c3ed3e3',
                first_name: 'John',
                last_name: 'Doe',
                email: 'john.doe12@yopmail.com',
                password:
          '$2a$10$8BYT7R6QUhfHbk423soQ0uZuQX22rgHVpS4H02w8YgUq885eOKoki',
                role_id: 1,
                status: 'active'
            },
            {
                id: '7dc17a2f-af7b-432d-9dc8-1d9bb3ee3b51',
                first_name: 'Steve',
                last_name: 'Smith',
                email: 'steve@yopmail.com',
                role_id: 2,
                status: 'invited'
            },
            {
                id: '899534c2-9382-4b7d-bb32-77fa98898f9d',
                first_name: 'Andrea',
                last_name: 'Botez',
                email: 'andrea@yopmail.com',
                password:
          '$2a$10$8BYT7R6QUhfHbk423soQ0uZuQX22rgHVpS4H02w8YgUq885eOKoki',
                role_id: 3,
                status: 'inactive'
            },
            {
                id: 'fb2e3e70-439f-483b-ad91-258fe03a95da',
                first_name: 'Alex',
                last_name: 'Bob',
                email: 'alex@yopmail.com',
                password:
          '$2a$10$8BYT7R6QUhfHbk423soQ0uZuQX22rgHVpS4H02w8YgUq885eOKoki',
                role_id: 3,
                status: 'active'
            },
            {
                id: '6c6c730f-0834-4e57-9d55-3be5be66c021',
                first_name: 'Maria',
                last_name: 'Nelson',
                email: 'maria@yopmail.com',
                password:
          '$2a$10$8BYT7R6QUhfHbk423soQ0uZuQX22rgHVpS4H02w8YgUq885eOKoki',
                role_id: 2,
                status: 'active'
            },
            {
                id: 'd601e51b-1bea-48d5-ba26-cea109f5cf57',
                first_name: 'David',
                last_name: 'Warner',
                email: 'david@yopmail.com',
                password:
            '$2a$10$8BYT7R6QUhfHbk423soQ0uZuQX22rgHVpS4H02w8YgUq885eOKoki',
                role_id: 3,
                status: 'active'
            }
        ]);
    },
    down: function (queryInterface) {
        return queryInterface.bulkDelete('user', null, {});
    }
};
