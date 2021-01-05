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

const getRenderers = (slug, imageData) => {


  return {
    image: image => {
      let { src } = image;
      let height, width;
      const absoluteRegex = new RegExp("^(http(s?):\/\/)");

      if (!src.match(absoluteRegex)) {
        const cleanedSrc = src.replace(/^\.\//, "");
        const { width: imgWidth, height: imgHeight } = imageData[cleanedSrc];

        width = imgWidth;
        height = imgHeight;

        src = `/post-images/${slug}/${cleanedSrc}`;
      }

      return <Image src={image.src} height={height} width={width}/>

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
              // transformImageUri={(uri): string => {
              //   const absoluteRegex = new RegExp("^(http(s?):\/\/)");

              //   if (uri.match(absoluteRegex)) {
              //     return uri;
              //   }

              //   const cleanedSrc = uri.replace(/^\.\//, "");

              //   return `/post-images/${pageData.slug}/${cleanedSrc}`;
              // }}
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
