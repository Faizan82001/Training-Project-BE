'use strict';

module.exports = (sequelize, DataTypes) => {
    const Trip = sequelize.define(
        'trip',
        {
            runNo: {
                field: 'run_no',
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            serviceType: {
                field: 'service_type',
                type: DataTypes.ENUM('ALS', 'BLS', 'CCT')
            },
            creatorId: {
                field: 'creator_id',
                type: DataTypes.UUID,
                allowNull: false
            },
            assignee: DataTypes.UUID,
            status: {
                type: DataTypes.ENUM(
                    'New Request',
                    'Assigned for Review',
                    'Request more Information',
                    'Data Provided',
                    'Approved',
                    'Approved with Exception'
                ),
                defaultValue: 'New Request'
            },
            exceptionMessage: {
                field: 'exception_message',
                type: DataTypes.STRING
            },
            timeTaken: {
                field: 'time_taken',
                type: DataTypes.INTEGER
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
            tableName: 'trip'
        }
    );

    Trip.associate = (models) => {
        Trip.belongsTo(models.user, {
            foreignKey: 'creatorId',
            as: 'creator_data'
        });
        Trip.belongsTo(models.user, {
            foreignKey: 'assignee',
            as: 'assignee_data'
        });
        Trip.hasOne(models.patient, { foreignKey: 'tripRunNo', as: 'run_no' });
        Trip.belongsTo(models.document, {
            foreignKey: 'runNo',
            as: 'trip_data'
        });
    };

    return Trip;
};
