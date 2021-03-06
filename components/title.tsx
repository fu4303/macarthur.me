import DateFormatter from "./date-formatter";
import Button from "./button";

type TitleProps = {
  children: React.ReactNode;
  date?: string;
  isPost?: boolean;
  subTitle?: string;
};

const Title = ({ children, date, isPost, subTitle }: TitleProps) => {
  return (
    <div className="mt-1 lg:mt-6 mb-4 lg:mb-12">
      <div>
        <h1 className="text-4xl md:text-6xl font-extrabold pb-2 gradient-text inline-block leading-none">
          {children}
        </h1>

        {subTitle && (
          <h2 className="font-light text-xl italic text-gray-500 mb-2">
            {subTitle}
          </h2>
        )}
      </div>

      {isPost && (
        <span className="inline-block mb-3 mr-4 text-base">
          <Button
            href="/posts"
            internal={true}
            naked={true}
            pointLeft={true}
            small={true}
            classes={"text-gray-500"}
            inheritColor={true}
          >
            Back to Posts
          </Button>
        </span>
      )}

      {date && <DateFormatter dateString={date} />}
    </div>
  );
};

export default Title;
