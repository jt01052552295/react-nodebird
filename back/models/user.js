const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        email: {
          type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
          unique: true, // 고유한 값
          get() {
            const rawValue = this.getDataValue("email")
              ? this.getDataValue("email").toString()
              : "";
            return rawValue;
          },
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false, // 필수
          get() {
            const rawValue = this.getDataValue("nickname")
              ? this.getDataValue("nickname").toString()
              : "";
            return rawValue;
          },
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
          get() {
            const rawValue = this.getDataValue("password")
              ? this.getDataValue("password").toString()
              : "";
            return rawValue;
          },
        },
      },
      {
        modelName: "User",
        tableName: "zero_users",
        charset: "utf8",
        collate: "utf8_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "zero_Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "zero_Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "zero_Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  }
};
