import MarkdownLayout from "../../components/markdown-layout";
import { getContentBySlug, getAllPosts } from "../../lib/api";

import "prismjs/themes/prism-okaidia.css";


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
