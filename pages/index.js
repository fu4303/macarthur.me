import Head from 'next/head';
import Meta from '../components/meta'
import Nav from '../components/Nav';

const clipCover = '40';

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

              <span className="absolute top-0 left-0 text-white z-10" style={{
                '-webkit-text-stroke': '5px #a0aec0',
              }}>
                Alex MacArthur
              </span>

              <span className="absolute top-0 left-0 text-white z-20" style={{
              }}>
                Alex MacArthur
              </span>

              <span className="relative z-30 text-white" style={{
                '-webkit-text-stroke': '5px white',
                'clip-path': `inset(-1% -1% ${clipCover}% -1%)`,
              }}>
                Alex MacArthur
              </span>

              <span className="absolute top-0 left-0 z-40 text-gray-900" style={{
                'clip-path': `inset(-1% -1% ${clipCover - 5}% -1%)`,
              }}>Alex MacArthur</span>


            </h1>
            <span className="pl-2 md:pl-0 text-2xl md:text-4xl leading-10 inline-block mt-1 text-gray-500">is a web developer in Nashville-ish, TN.</span>
          </div>
        </main>
      </div>
    </>
  )
}
