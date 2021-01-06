import Link from 'next/link';
import DateFormatter from './date-formatter';

const PostList = ({posts}) => {
  return (
    <ul className="space-y-8">
      {posts.map(post => {
        return (
          <li key={post.slug}>
            <article>
              <h2 className="text-3xl font-semibold">
                <Link href={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <DateFormatter dateString={post.date} />
            </article>
          </li>
        )
      })}
    </ul>
  )
}

export default PostList;
