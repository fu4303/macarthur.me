import Head from 'next/head';
import Meta from '../components/meta'
import Nav from '../components/Nav';

const clipCover = '50%';

export default function Index() {
  return (
    <>
      <Head>
        <title>Alex MacArthur</title>
      </Head>

      <Meta />

      <Nav classes="absolute" />

      <div className="min-h-screen">
        <main className="h-screen w-screen flex items-center justify-center p-6">
          <div className="text-white">
            <h1 className="font-semibold leading-none text-7xl relative text-gray-900">
              <span className="relative z-20 text-white" style={{
                '-webkit-text-stroke': '5px white',
              }}>
                Alex MacArthur
              </span>

              <span className="absolute top-0 left-0 z-50 text-gray-900" style={{
                'clip-path': `inset(-1% -1% ${clipCover} -1%)`,
              }}>Alex MacArthur</span>

              <span className="absolute top-0 left-0 z-10 text-white">
                Alex MacArthur
              </span>

              {/* <span className="absolute top-0 left-0 z-10 text-white" style={{
              }}>
                Alex MacArthur
              </span> */}

            </h1>
            <span className="pl-2 md:pl-0 text-2xl md:text-4xl leading-10 inline-block mt-1 text-gray-500">is a web developer in Nashville-ish, TN.</span>
          </div>
        </main>
      </div>
    </>
  )
}
