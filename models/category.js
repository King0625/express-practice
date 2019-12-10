'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsToMany(models.Post, {
      through: 'CategoryPost',
      // foreignKey: 'postId'
    });
  };
  return Category;
};