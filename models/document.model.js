'use strict';

module.exports = (sequelize, DataTypes) => {
    const Document = sequelize.define('document', {
        runNo: {
            field: 'run_no',
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        faceSheet: {
            type: DataTypes.STRING,
            field: 'face_sheet'
        },
        pcs: DataTypes.STRING,
        aob: DataTypes.STRING,
        other1: {
            type: DataTypes.STRING,
            field: 'other_1'
        },
        other2: {
            type: DataTypes.STRING,
            field: 'other_2'
        },
        other3: {
            type: DataTypes.STRING,
            field: 'other_3'
        },
        other4: {
            type: DataTypes.STRING,
            field: 'other_4'
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
        tableName: 'document'
    });

    Document.associate = (models) => {
        Document.hasOne(models.trip, {
            foreignKey: 'runNo',
            as: 'trip_data'
        });
    };

    return Document;
};
