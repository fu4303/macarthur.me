import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "./container";
import Layout from "./layout";
import Head from "next/head";
import Title from "./title";

import "prismjs/themes/prism-okaidia.css";

export default function Post({ pageContent, isPost = false }) {
  const router = useRouter();

  if (!router.isFallback && !pageContent?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        <article>
          <Head>
            <title>{pageContent.title} | Alex MacArthur</title>

            <meta property="og:image" content={pageContent.open_graph} />
          </Head>

          <Title date={pageContent.date} isPost={isPost}>
            {pageContent.title}
          </Title>

          <Container narrow={true}>
            <div
              className="post-content prose md:prose-xl"
              dangerouslySetInnerHTML={{ __html: pageContent.content }}
            />
          </Container>
        </article>
      </Container>
    </Layout>
  );
}
