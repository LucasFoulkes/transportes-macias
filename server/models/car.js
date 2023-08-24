const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Vehiculo', {
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pesoMaximo: {
      type: DataTypes.FLOAT
    },
    dimensionesAlmacenamiento: {
      type: DataTypes.STRING
    },
    altura: {
      type: DataTypes.FLOAT
    },
    ancho: {
      type: DataTypes.FLOAT
    }
  }, {
    timestamps: false
  });
};
