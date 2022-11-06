exports.isLoggedIn = (req, res, next) => {
  // console.log("middle", req);
  console.log("middle", req.isAuthenticated());
  if (req.isAuthenticated()) {
    next(); // 다음 미들웨어로.. 에러가 있다면 에러처리함.
  } else {
    res.status(401).send("로그인이 필요합니다!");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다!");
  }
};
