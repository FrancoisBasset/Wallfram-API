module.exports = (sequelize, DataTypes) => {
    const Wallpapers = sequelize.define('Wallpapers', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        type: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        timestamps: false,
        paranoid: false,
        freezeTableName: true
    });

    Wallpapers.associate = _associate;

    return Wallpapers;
};

function _associate(models) {
    models.Wallpapers.belongsTo(models.Types, {
        foreignKey: 'type'
    });
}