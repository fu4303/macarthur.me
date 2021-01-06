import Layout from './layout';
import Title from './title';
import Pagination from './pagination';
import PostList from './post-list';

const PostListLayout = ({ posts, nextPage, previousPage }) => {
  return (
    <Layout narrow={true}>
      <Title>
        Posts
      </Title>

      <PostList posts={posts} />

      <Pagination
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </Layout>
  )
}

export default PostListLayout;
