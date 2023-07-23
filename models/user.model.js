'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        },
        roleId: {
            field: 'role_id',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('invited', 'active', 'inactive'),
            allowNull: false,
            defaultValue: 'invited'
        },
        token: DataTypes.STRING,
        expiryDate: {
            field: 'expiry_date',
            type: DataTypes.DATE
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
        },
        fcmToken: {
            field: 'fcm_token',
            type: DataTypes.STRING
        }
    }, {
        tableName: 'user'
    });

    User.associate = (models) => {
        User.belongsTo(models.role);
        User.hasOne(models.trip, { foreignKey: 'creatorId', as: 'creator_data' });
        User.hasOne(models.trip, { foreignKey: 'assignee', as: 'assignee_data' });
        User.hasMany(models.issues, { foreignKey: 'nurseId', as: 'nurse_id' });
    };

    return User;
};
