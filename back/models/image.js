const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Image extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        src: {
          type: DataTypes.STRING(200),
          allowNull: false,
          get() {
            const rawValue = this.getDataValue("src")
              ? this.getDataValue("src").toString()
              : "";
            return rawValue;
          },
        },
      },
      {
        modelName: "Image",
        tableName: "zero_images",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Image.belongsTo(db.Post);
  }
};
