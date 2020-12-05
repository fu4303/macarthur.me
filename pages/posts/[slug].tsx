import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import Title from "../../components/title";
import DateFormatter from "../../components/date-formatter";

export default function Post({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        <article className="post-content">
          <Head>
            <title>{post.title} | Alex MacArthur</title>

            <meta property="og:image" content={post.ogImage.url} />
          </Head>

          <Title date={post.date}>
            {post.title}
          </Title>

          {/* <DateFormatter dateString={post.date} className="inline-block mb-3" /> */}

          <div className="mx-auto max-w-3xl">

            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

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
  const posts = getAllPosts(["slug"]);

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
