import React from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";
import { END } from "redux-saga";

import axios from "axios";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import wrapper from "../../store/configureStore";
import PostCard from "../../components/PostCard";
import AppLayout from "../../components/AppLayout";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";

const Post = () => {
  const { singlePost } = useSelector((state) => state.post);
  const router = useRouter();
  const { id } = router.query;

  // if (router.isFallback) {
  //   return <div>Loading...</div>
  // }

  return (
    <AppLayout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : "http://localhost:3060/favicon.ico"
          }
        />
        <meta property="og:url" content={`http://localhost:3060/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { id: '1' } },
//       { params: { id: '2' } },
//       { params: { id: '3' } },
//       { params: { id: '4' } },
//     ],
//     fallback: true,
//   };
// }

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params, ...etc }) => {
      const cookie = req ? req.headers.cookie : "";
      //   console.log(req);
      //   console.log(res);
      //   console.log(params);
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_POST_REQUEST,
        data: params.id,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
      return { props: {} };
    }
);

export default Post;
