import MarkdownLayout from "../../components/markdown-layout";
import { getContentBySlug, getAllPosts, getImageDataForSlug } from "../../lib/api";

import "prismjs/themes/prism-okaidia.css";

export default function Post({ post, imageData }) {
  return <MarkdownLayout
    pageData={post}
    imageData={imageData}
    isPost={true}
  />;
}

export async function getStaticProps({ params }) {
  const post = getContentBySlug(params.slug, 'post');
  const imageData = getImageDataForSlug(params.slug);

  return {
    props: {
      post,
      imageData
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
