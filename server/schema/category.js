module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'category',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      cagegoryName: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: ''
      }
    },
    {
      sequelize,
      tableName: 'category',
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
