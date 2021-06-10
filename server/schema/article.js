module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'article',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      createAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updateAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      isShow: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'article',
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
