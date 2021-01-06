import PostListLayout from '../../../components/post-list-layout';
import { getPageOfPosts, getPostPageCount } from '../../../lib/api';

const Posts = ({ posts, nextPage, previousPage }) => {
  return (
    <PostListLayout
      posts={posts}
      previousPage={previousPage}
      nextPage={nextPage}
    />
  )
}

export default Posts;

export async function getStaticProps({ params }) {
  const pageNumber = Number(params.pageNumber);
  const numberOfPages = getPostPageCount();
  const previousPage = pageNumber - 1;
  const nextPage = pageNumber + 1;

  return {
    props: {
      posts: await getPageOfPosts(pageNumber),
      previousPage: previousPage <= 0 ? null : previousPage,
      nextPage: nextPage > numberOfPages ? null : nextPage
    }
  }
}

export async function getStaticPaths() {
  const emptyArray = new Array(getPostPageCount());

  return {
    paths: (emptyArray.fill(null)).map((_value, index) => {
      return {
        params: {
          pageNumber: (index + 1).toString()
        }
      }
    }),
    fallback: false
  };
}
