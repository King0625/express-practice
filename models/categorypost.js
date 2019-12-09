'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoryPost = sequelize.define('CategoryPost', {
    categoryId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  CategoryPost.associate = function(models) {
    // associations can be defined here
  };
  return CategoryPost;
};