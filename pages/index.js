import Head from 'next/head';
import Meta from '../components/meta'
import Nav from '../components/Nav';

const shadowDepth = '3px';

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
            <h1 className="font-semibold leading-none text-7xl relative text-gray-900 tracking-widest" style={{
              textShadow: `${shadowDepth} ${shadowDepth} #ffffff`
            }}>
              <span className="relative z-10 text-gray-900" style={{
                  '-webkit-text-fill-color': 'transparent',
                  '-webkit-text-stroke-width': '3px',
                  '-webkit-text-stroke-color': 'white',
                  'text-shadow': '8px 8px #ff1f8f, 20px 20px #000000'
              }}>
                Alex MacArthur
              </span>

              {/* <span className="absolute top-0 left-0 text-gray-900 tracking-widest" style={{
                // '-webkit-text-stroke': '3px white',
                // textShadow: `-${shadowDepth} -${shadowDepth} #ffffff`
              }}>Alex MacArthur</span> */}
            </h1>
            <span className="pl-2 md:pl-0 text-2xl md:text-4xl leading-10 inline-block mt-1 text-gray-500">is a web developer in Nashville-ish, TN.</span>
          </div>
        </main>
      </div>
    </>
  )
}
