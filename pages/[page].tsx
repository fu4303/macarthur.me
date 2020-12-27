import PageLayout from "../components/PageLayout";
import { getContentBySlug, getAllPages } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";

export default function Page({ page }) {
  return <PageLayout pageContent={page} />;
}

export async function getStaticProps({ params }) {
  const post = getContentBySlug(params.slug);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      }
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPages();

  console.log("HERE");
  console.log(posts);

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
