import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "./container";
import Layout from "./layout";
import Title from "./title";
import Meta from './meta';
import Bio from './bio';
import SocialShare from './social-share';
import { activateImage, createObserver } from '../lib/images';
import { useRef, useEffect } from 'react';

import 'prismjs/themes/prism-okaidia.css';

export default function PostLayout({ pageData, imageData = {}, isPost = null }) {
  const contentRef = useRef(null);
  const router = useRouter();
  const { title, date, ogImage, excerpt } = pageData;

  if (!router.isFallback && !pageData?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => {
    const images = [...contentRef.current.querySelectorAll('[data-lazy-src]')];
    console.log(contentRef.current);
    console.log(images);

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
    <>
      <Title
        date={date}
        isPost={isPost}
      >
        {title}

      </Title>

      <div
        className="post-content mx-auto prose max-w-none md:prose-lg"
        dangerouslySetInnerHTML={{__html: pageData.content}}></div>
    </>
  );

  return (
    <Layout ref={contentRef} >
      <Meta
        isPost={true}
        title={title}
        image={ogImage}
        description={excerpt}
      />
      <Container narrow={true}>

      {!isPost && <ContainerContent />}

      {isPost &&
        <>
          <article className="mb-12">
            <ContainerContent />
          </article>

          <Bio />
          <SocialShare title={title} url="hey" />
        </>
      }
      </Container>
    </Layout>
  );
}
