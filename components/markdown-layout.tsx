import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "./container";
import Layout from "./layout";
import Title from "./title";
import Meta from './meta';
import { activateImage, createObserver } from '../lib/images';
import { useRef, useEffect } from 'react';

import 'prismjs/themes/prism-okaidia.css';

export default function PostLayout({ pageData, imageData = {}, isPost = null }) {
  const contentRef = useRef(null);
  const router = useRouter();
  const { title, date, slug, ogImage, excerpt } = pageData;

  if (!router.isFallback && !pageData?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => {
    const images = [...contentRef.current.querySelectorAll('[data-lazy-src]')];
    const observers = images.map(image => {
      const observer = createObserver(image, () => {
        activateImage(image, (e => {
          e.target.classList.add('opacity-100');
        }));
      });

      observer.observe();

      return observer;
    });

    return () => {
      observers.forEach(({ kill }) => kill());
    }
  }, []);

  const ContainerContent: any = () => (
    <Container narrow={true}>
      <Title
        date={date}
        isPost={isPost}
      >
        {title}

      </Title>

      <div
        ref={contentRef}
        className="post-content mx-auto prose max-w-none md:prose-lg"
        dangerouslySetInnerHTML={{__html: pageData.content}}></div>
    </Container>
  );

  return (
    <Layout>
      <Meta
        isPost={true}
        title={title}
        image={ogImage}
        description={excerpt}
      />

      {isPost && <ContainerContent />}

      {!isPost &&
        <article>
          <ContainerContent />
        </article>
      }
    </Layout>
  );
}
