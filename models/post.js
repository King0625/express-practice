'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.INTEGER,
    topic: DataTypes.STRING,
    content: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Post.belongsToMany(models.Category, {
      through: 'CategoryPost',
      // foreignKey: 'categoryId'
    })
  };
  return Post;
};