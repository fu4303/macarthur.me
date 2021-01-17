const Bio = () => {
  return (
    <div className="flex items-center space-x-3 md:space-x-6 max-w-xl mx-auto">
      <div>
        <img
          data-lazy-src="/avatar.jpg"
          src={"/avatar.jpg"}
          alt=""
          className="rounded w-32" />
      </div>

      <div>
        <p className="prose">
          Alex MacArthur is a software developer working for Dave Ramsey in Nashville, TN. Soli Deo gloria.
        </p>
      </div>

    </div>
  )
}

export default Bio;
