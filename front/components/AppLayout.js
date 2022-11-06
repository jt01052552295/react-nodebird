import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
const { Search } = Input;
import { useSelector } from "react-redux";
import Router from "next/router";

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import useInput from "../hooks/useInput";

// const dummy = {
//   nickname: "제로초",
//   Post: [],
//   Followings: [],
//   Followers: [],
//   isLoggedIn: false,
// };

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state?.user);
  // 위처럼 구조분해할당해서 써도되고, 아래처럼 써도되고
  // const me = useSelector((state) => state?.user.me);

  const [searchInput, onChangeSearchInput] = useInput("");

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  const items = [
    { label: <Link href="/">노드버드</Link>, key: "link1" }, // remember to pass the key prop
    { label: <Link href="/profile">프로필</Link>, key: "link2" }, // which is required
    {
      label: (
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onSearch={onSearch}
          style={{ verticalAlign: "middle" }}
        />
      ),
      key: "search",
    },
    { label: <Link href="/signup">회원가입</Link>, key: "link3" },
  ];

  return (
    <div>
      <div>
        <Menu items={items} mode="horizontal" />

        <Row gutter={[8, 8]}>
          <Col xs={24} md={6}>
            {me ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          <Col xs={24} md={6}>
            <a
              href="https://naver.com"
              target="_blank"
              rel="noreferrer nopoener"
            >
              Made by jtm.
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
