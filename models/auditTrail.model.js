'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('audit_trail', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            field: 'first_name',
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            field: 'last_name',
            type: DataTypes.STRING,
            allowNull: false
        },
        runNo: {
            field: 'run_no',
            type: DataTypes.INTEGER
        },
        status: {
            field: 'status',
            type: DataTypes.STRING
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            defaultValue: Date.now
        },
        roleId: {
            field: 'role_id',
            type: DataTypes.INTEGER
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            defaultValue: Date.now
        }
    }, {
        tableName: 'audit_trail'
    });
};

