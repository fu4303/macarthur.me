import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "./container";
import Layout from "./layout";
import Head from "next/head";
import Title from "./title";
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism'
// import Image from "next/image"
import Image from "./image";

const renderers = {
  image: image => {
    /**
     * @todo: Figure out why SVGs are not getting found.
     *
     * http://localhost:3000/posts/when-dom-updates-appear-to-be-asynchronous
     */

    return <Image src={image.src} />

    // const { width, height } = imageData[`${slug}/${cleanedSrc}`];

    // return <Image
    //   className={"post-image"}
    //   src={src}
    //   alt={image.alt}
    //   width={width}
    //   height={height}
    //   objectFit={'contain'}
    // />
  },
  code: ({ language, value }) => {
    return <SyntaxHighlighter style={okaidia} language={language} children={value} />
  }
};

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

          <Container narrow={true}>
            <Title
              date={pageContent.date}
              isPost={isPost}
            >
              {pageContent.title}
            </Title>

            <ReactMarkdown
              transformImageUri={(uri): string => {
                console.log(uri);

                const absoluteRegex = new RegExp("^(http(s?):\/\/)");

                if(uri.match(absoluteRegex)) {
                  return uri;
                }

                const cleanedSrc = uri.replace(/^\.\//, "");

                return `/post-images/${pageContent.slug}/${cleanedSrc}`;
              }}
              rawSourcePos={true}
              className="post-content prose md:prose-xl"
              allowDangerousHtml={true}
              children={pageContent.content}
              renderers={renderers}
            />
          </Container>
        </article>
      </Container>
    </Layout>
  );
}
