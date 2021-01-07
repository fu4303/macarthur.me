import Head from 'next/head';
import Meta from '../components/meta'
import Nav from '../components/nav';
import Logo from '../components/logo';

export default function Index() {
  return (
    <>
      <Head>
        <title>Alex MacArthur</title>
      </Head>

      <Meta />

      <Nav isAbsolute={true} />

      <div className="min-h-screen">
        <main className="h-screen w-screen flex items-center justify-center p-6">
          <div className="text-white">
            <h1 className="font-semibold leading-none text-7xl text-gray-900">
              <Logo />
            </h1>
            <span className="pl-2 md:pl-0 text-xl md:text-2xl leading-10 inline-block text-gray-500 font-light">is a web developer in Nashville-ish, TN.</span>
          </div>
        </main>
      </div>
    </>
  )
}
