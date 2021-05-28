// const sequelize = require('sequelize')
module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'users',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: ''
      },
      password: {
        type: DataTypes.CHAR(180),
        allowNull: false,
        defaultValue: ''
      }
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        }
      ]
    }
  )
}
