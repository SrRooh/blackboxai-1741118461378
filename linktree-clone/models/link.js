const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Link = sequelize.define('Link', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'fas fa-link' // Default Font Awesome icon
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    indexes: [
      {
        unique: false,
        fields: ['order']
      }
    ]
  });

  return Link;
};
