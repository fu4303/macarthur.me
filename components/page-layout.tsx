import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "./container";
import Layout from "./layout";
import Head from "next/head";
import Title from "./title";
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from "./image";

const getRenderers = (slug, imageData) => {
  return {
    image: image => {
      let { src } = image;
      let height, width;
      const absoluteRegex = new RegExp("^(http(s?):\/\/)");

      if (!src.match(absoluteRegex)) {
        const cleanedSrc = src.replace(/^\.\//, "");
        const {
          width: imgWidth,
          height: imgHeight
        } = imageData[cleanedSrc];

        width = imgWidth;
        height = imgHeight;

        src = `/post-images/${slug}/${cleanedSrc}`;
      }

      return <Image
        src={src}
        height={height}
        width={width}
        classes={"transition-opacity opacity-0"}
        loadedClass="opacity-100"
      />
    },
    code: ({ language, value }) => {
      return <SyntaxHighlighter style={okaidia} language={language} children={value} />
    }
  };
}

export default function Post({ pageData, imageData = {}, isPost = false }) {
  const router = useRouter();
  const { title, date, slug, open_graph } = pageData;

  if (!router.isFallback && !pageData?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        <article>
          <Head>
            <title>{title} | Alex MacArthur</title>

            <meta property="og:image" content={open_graph} />
          </Head>

          <Container narrow={true}>
            <Title
              date={date}
              isPost={isPost}
            >
              {title}
            </Title>

            <ReactMarkdown
              rawSourcePos={true}
              className="post-content prose md:prose-xl"
              allowDangerousHtml={true}
              children={pageData.content}
              renderers={getRenderers(slug, imageData)}
            />
          </Container>
        </article>
      </Container>
    </Layout>
  );
}
