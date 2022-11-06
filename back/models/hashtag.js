const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Hashtag extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
          get() {
            const rawValue = this.getDataValue("name")
              ? this.getDataValue("name").toString()
              : "";
            return rawValue;
          },
        },
      },
      {
        modelName: "Hashtag",
        tableName: "zero_hashtags",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, { through: "zero_PostHashtag" });
  }
};
