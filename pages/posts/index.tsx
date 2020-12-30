import Link from 'next/link';
import DateFormatter from '../../components/date-formatter';
import Layout from '../../components/layout';
import Title from '../../components/title';
import { getAllPosts } from '../../lib/api';

const Posts = ({posts}) => {
  return (
    <Layout narrow={true}>
      <Title>
        Posts
      </Title>

      <ul className="space-y-8">
        {posts.map(post => {
          return (
            <li key={post.slug}>
              <article>
                <h2 className="text-3xl font-semibold">
                  <Link href={`/posts/${post.slug}`}>
                    { post.title }
                  </Link>
                </h2>

                <DateFormatter dateString={post.date} />
              </article>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Posts;

export async function getStaticProps({ params }) {
  return {
    props: {
      posts: await getAllPosts()
    }
  }
}
