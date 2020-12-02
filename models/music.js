'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Music.belongsTo(models.Artist, { foreignKey: 'artistId', as: 'artist' });
      Music.belongsToMany(models.User, { through: { model: 'Like' }, foreignKey: 'musicId', as: 'likes' });
    }
  }
  Music.init(
    {
      title: DataTypes.STRING,
      artistId: DataTypes.INTEGER,
      year: DataTypes.STRING,
      img: DataTypes.STRING,
      audio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Music',
    }
  );
  return Music;
};
