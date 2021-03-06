module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Types', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false,
        paranoid: false,
        freezeTableName: true
    });
};
