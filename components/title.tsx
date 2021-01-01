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
    <div className="my-8 mb-12">

      <div>
        <h1 className="text-3xl md:text-6xl font-extrabold leading-snug md:leading-none mb-2 gradient-text inline-block">
          {children}
        </h1>

        {/* {subtitle &&
          <h2>
            {subtitle}
          </h2>
        } */}
      </div>

      { isPost &&
        <span className="inline-block mb-3 mr-2">
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
