module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Producto_Recibo', {
      id_producto_recibo: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'productos',
          key: 'id_producto'
        }
      },
      id_recibo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'recibos',
          key: 'id_recibo'
        }
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'producto_recibo',
      timestamps: false
    });
  };
  