import { Children } from 'react';
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
import Meta from './meta';

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
        classes={"transition-opacity opacity-0 mx-auto block"}
        loadedClass="opacity-100"
      />
    },
    code: ({ language, value }) => {
      return <SyntaxHighlighter style={okaidia} language={language} children={value} />
    },
    heading: (props) => {
      // Recursively loop through a React element to pull out the static text.
      const flatten = (text: string, child) => {
        return typeof child === 'string'
        ? text + child
        : Children.toArray(child.props.children).reduce(flatten, text);
      };

      // Extract the heading text.
      const headingText = props.children.reduce((fullText, child) => {
        return flatten(fullText, child);
      }, "");

      // Convert the text to a slug by replacing every non-word character with a "-";
      const slug = headingText
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]/g, "")
        .replace(/\s/g, "-");

      const HeadingTag: any = `h${props.level}`;

      return (
        <HeadingTag id={slug}>
          <a href={`#${slug}`}>
            { props.children }
          </a>
        </HeadingTag>
      )
    }
  };
}

export default function PostLayout({ pageData, imageData = {}, isPost = null }) {
  const router = useRouter();
  const { title, date, slug, open_graph } = pageData;

  if (!router.isFallback && !pageData?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const ContainerContent: any = () => (
    <Container narrow={true}>
      <Title
        date={date}
        isPost={isPost}
      >
        {title}
      </Title>

      <ReactMarkdown
        linkTarget={(_url, _text, _title) => {
          return "_blank";
        }}
        rawSourcePos={true}
        className="post-content mx-auto prose max-w-none md:prose-lg"
        allowDangerousHtml={true}
        children={pageData.content}
        renderers={getRenderers(slug, imageData)}
      />
    </Container>
  );

  return (
    <Layout>
      <Meta isPost={true} description="hey"/>
      <Head>
        <title>{title} | Alex MacArthur</title>

        {open_graph && <meta property="og:image" content={open_graph} />}
      </Head>

      {isPost && <ContainerContent />}

      {!isPost &&
        <article>
          <ContainerContent />
        </article>
      }
    </Layout>
  );
}
