import { getPageOfPosts } from '../../lib/api';
import PostListLayout from '../../components/post-list-layout';

const Posts = ({ posts, previousPage, nextPage }) => {
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
  return {
    props: {
      posts: await getPageOfPosts(1),
      previousPage: null,
      nextPage: 2
    }
  }
}
