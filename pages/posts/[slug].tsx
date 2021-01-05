import PageLayout from "../../components/PageLayout";
import { getContentBySlug, getAllPosts, getImageDataForSlug } from "../../lib/api";
// import markdownToHtml from "../../lib/markdownToHtml";

import "prismjs/themes/prism-okaidia.css";

export default function Post({ post, imageData }) {
  return <PageLayout pageData={post} imageData={imageData} isPost={true} />;
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
