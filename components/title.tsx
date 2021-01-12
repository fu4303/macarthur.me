import DateFormatter from "./date-formatter";
import Link from 'next/link'

type TitleProps = {
  children: React.ReactNode,
  date?: string,
  isPost?: boolean,
  subtitle?: string
}

const Title = ({children, date, isPost, subtitle}: TitleProps) => {
  return (
    <div className="mt-6 mb-12 lg:mb-12">

      <div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-2 gradient-text inline-block leading-tight">
          {children}
        </h1>

        {subtitle &&
          <h2 className="font-light text-2xl italic text-gray-500">
            {subtitle}
          </h2>
        }
      </div>

      { isPost &&
        <span className="inline-block mb-3 mr-4">
          <Link href="/posts">
            ← Back to Posts
            </Link>
        </span>
      }

      {date &&
        <DateFormatter dateString={date} />
      }
    </div>
  )
}

export default Title;
