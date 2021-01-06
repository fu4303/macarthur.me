import Link from 'next/link'

const Pagination = ({previousPage = null, nextPage = null}) => {
  return (
    <div className="flex justify-center mt-8">
      <ul className="flex space-x-3">
        { previousPage &&
          <li>
            <Link href={`/posts/page/${previousPage}`}>
              <a>Back</a>
            </Link>
          </li>
        }

        { nextPage &&
          <li>
            <Link href={`/posts/page/${nextPage}`}>
              <a>Next</a>
            </Link>
          </li>
        }
      </ul>
    </div>
  )
}

export default Pagination;
