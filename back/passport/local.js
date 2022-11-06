const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", //req.body.email
        passwordField: "password", // req.body.password
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            // done ( 서버에러, 결과, 클라이언트 에러메시지) : route/user.js 에서 콜백실행됨. 파라미터 (err, user, info)
            return done(null, false, { reason: "존재하지 않는 이메일입니다!" });
          }
          // console.log(user instanceof User); // true
          // console.log(user.toJSON());
          // console.log(user.email.toString());
          const result = await bcrypt.compare(
            password,
            user.password.toString()
          );

          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          // console.error(error);
          // return done(null, false, { reason: "????." });
          return done(error);
        }
      }
    )
  );
};
