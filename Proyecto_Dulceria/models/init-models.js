var DataTypes = require("sequelize").DataTypes;
var _generos = require("./generos");
var _productos = require("./productos");
var _recibos = require("./recibos");
var _roles = require("./roles");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var generos = _generos(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);
  var recibos = _recibos(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  usuarios.belongsTo(generos, { as: "id_genero_genero", foreignKey: "id_genero"});
  generos.hasMany(usuarios, { as: "usuarios", foreignKey: "id_genero"});
  usuarios.belongsTo(roles, { as: "id_rol_role", foreignKey: "id_rol"});
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "id_rol"});

  return {
    generos,
    productos,
    recibos,
    roles,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
