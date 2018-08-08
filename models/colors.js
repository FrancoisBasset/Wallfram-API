module.exports = (sequelize, DataTypes) => {
    const Colors = sequelize.define('Colors', {
        wallpaper: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        red: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        green: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        blue: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        percent: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        timestamps: false,
        paranoid: false,
        freezeTableName: true
    });

    Colors.removeAttribute('id');

    Colors.associate = _associate;

    return Colors;
};

function _associate(models) {
    models.Colors.belongsTo(models.Wallpapers, {
        foreignKey: 'wallpaper'
    });
}
