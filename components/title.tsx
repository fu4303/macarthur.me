import DateFormatter from "./date-formatter";
import Link from 'next/link'

type TitleProps = {
  children: React.ReactNode,
  date?: string,
  isPost?: boolean
}

const Title = ({children, date, isPost}: TitleProps) => {
  return (
    <div className="my-8 mb-12">
      { isPost &&
        <span className="inline-block mb-3">
          <Link href="/posts">
            ← Back to Posts
            </Link>
        </span>
      }

      <h1 className="text-6xl font-extrabold leading-none mb-2">
        {children}
      </h1>

      {date &&
        <DateFormatter dateString={date} />
      }
    </div>
  )
}

export default Title;
