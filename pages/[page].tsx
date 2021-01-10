import PageLayout from "../components/page-layout";
import PostLayout from "../components/post-layout";
import { getContentBySlug, getAllPages } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";

export default function Page({ page }) {
  return <PostLayout pageData={page} isPost={false} />;
}

export async function getStaticProps({ params }) {
  const page = getContentBySlug(params.page, 'page');
  const content = await markdownToHtml(page.content || "");

  return {
    props: {
      page: {
        ...page,
        content,
      }
    },
  };
}

export async function getStaticPaths() {
  const pages = getAllPages();

  return {
    paths: pages.map((page) => {
      return {
        params: {
          page: page.slug,
        },
      };
    }),
    fallback: false,
  };
}
