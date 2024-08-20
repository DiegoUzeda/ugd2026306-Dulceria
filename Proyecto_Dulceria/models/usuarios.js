const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id_rol'
      }
    },
    id_genero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'generos',
        key: 'id_genero'
      }
    },
    apellido_paterno_usuario: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido_materno_usuario: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nombre_usuario: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email_usuario: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    contrasena_usuario: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
      {
        name: "fk_usu",
        using: "BTREE",
        fields: [
          { name: "id_rol" },
        ]
      },
      {
        name: "fk_usua",
        using: "BTREE",
        fields: [
          { name: "id_genero" },
        ]
      },
    ]
  });
};
