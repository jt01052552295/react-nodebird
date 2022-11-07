const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const hashtagRouter = require("./routes/hashtag");
const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공!");
  })
  .catch(console.error);
passportConfig();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  // CORS
  app.use(
    cors({
      origin: ["http://localhost:3060", "http://3.35.208.133"],
      credentials: true, // 쿠키도 같이 전달된다.
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true, // credentials : true 일때는 주소를 지정해줘야 한다. ( true 해도 됨. * 안됨.)
      credentials: true,
    })
  );
}

// 프론트에서 이미지에 접근할 수 있도록 {url}/uploads 경로로 만들어준다.
app.use("/", express.static(path.join(__dirname, "uploads")));
// 프론트에서보낸 json 데이터, form 데이터를 req.body에 넣어준다.
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

// 쿠키, 세션 미들웨어
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello express");
});

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
// prefix 적용
app.use("/posts", postsRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);

// 에러처리 미들웨어 : 기본적으로 있지만, 따로 처리하고 싶을경우 사용
// app.use((err, req, res, next)=>{
// })

app.listen(3065, () => {
  console.log("서버 실행중!");
});
