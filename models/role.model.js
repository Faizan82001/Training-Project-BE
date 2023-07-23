'use strict';

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        roleName: {
            field: 'role_name',
            type: DataTypes.STRING
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            defaultValue: Date.now
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            defaultValue: Date.now
        }
    },
    {
        tableName: 'role'
    });

    Role.associate = (models) => {
        Role.hasMany(models.user);
    };

    return Role;
};
