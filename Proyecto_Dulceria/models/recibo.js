module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Recibo', {
      id_recibo: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      cliente: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'recibos',
      timestamps: false
    });
  };
  