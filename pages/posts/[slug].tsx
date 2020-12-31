import PageLayout from "../../components/PageLayout";
import { getContentBySlug, getAllPosts } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";

import "prismjs/themes/prism-okaidia.css";

export default function Post({ post }) {
  return <PageLayout pageContent={post} isPost={true} />;
}

export async function getStaticProps({ params }) {
  const post = getContentBySlug(params.slug, 'post');
  const content = post.content || "";

  return {
    props: {
      post: {
        ...post,
        content,
      },
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
