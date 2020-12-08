import Link from 'next/link';
import Layout from '../../components/layout';
import Title from '../../components/title';
import { getAllPosts } from '../../lib/api';

const Posts = ({posts}) => {
  return (
    <Layout narrow={true}>
      <Title>
        Posts
      </Title>

      {posts.map(post => {
        return (
          <article key={post.slug}>
            <h2 className="text-3xl font-semibold">
              <Link href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
          </article>
        )
      })}
    </Layout>
  )
}

export default Posts;

export async function getStaticProps({ params }) {
  return {
    props: {
      posts: await getAllPosts(['title', 'content', 'date', 'slug'])
    },
  }
}
