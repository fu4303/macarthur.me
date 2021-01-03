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

// import imageData from '../lib/image-data.json';

const renderers = (slug) => {
  return {
    image: image => {
      const isAbsolute = image.src.match(/http(s?)\:/);

      console.log("HERE");
      console.log(image.src);

      if (isAbsolute) {
        return <img src={image.src} />
      }

      /**
       * @todo: Figure out why SVGs are not getting found.
       *
       * http://localhost:3000/posts/when-dom-updates-appear-to-be-asynchronous
       */

      const cleanedSrc = image.src.replace(/\.\//, "");
      const src = `/post-images/${slug}/${cleanedSrc}`;

      return <Image src={src} />

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
}

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
              rawSourcePos={true}
              className="post-content prose md:prose-xl"
              allowDangerousHtml={true}
              children={pageContent.content}
              renderers={renderers(pageContent.slug)}
            />
          </Container>
        </article>
      </Container>
    </Layout>
  );
}
