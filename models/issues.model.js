'use strict';

module.exports = (sequelize, DataTypes) => {
    const Issues = sequelize.define('issues', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nurseId: {
            field: 'nurse_id',
            type: DataTypes.UUID,
            allowNull: false
        },
        title: {
            field: 'title',
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
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
    }, {
        tableName: 'issues'
    });

    Issues.associate = (models) => {
        Issues.belongsTo(models.user, {
            foreignKey: 'nurseId',
            as: 'nurse_id'
        });
    };

    return Issues;
};
