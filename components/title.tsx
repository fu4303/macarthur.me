import DateFormatter from "./date-formatter";

type TitleProps = {
  children: React.ReactNode,
  date?: string
}

const Title = ({children, date}: TitleProps) => {
  return (
    <div className="my-8 mb-12">
      <h1 className="text-6xl font-semibold leading-none">
        {children}
      </h1>

      {date &&
        <DateFormatter dateString={date} />
      }
      ← Back to Posts
    </div>
  )
}

export default Title;
