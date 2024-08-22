const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recibos', {
    id_recibo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    detalle_recibo: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    total_recibo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cambio_recibo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: '',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_recibo" },
        ]
      },
    ]
  });
};
