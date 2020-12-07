import Head from 'next/head';
import Meta from '../components/meta'
import Nav from '../components/Nav';
import { useEffect } from 'react';
import BezierEasing from 'bezier-easing';

export default function Index() {

  useEffect(() => {
    let rafId = 0;

    const gradientEffect = async () => {
      let startTime = null;
      const duration = 500;
      const totalDegreesToTurn = 10;
      const easing = BezierEasing(.7, .33, .3, .62);

      const turnGradient = (timestamp) => {
        if (!startTime) {
          startTime = timestamp;
        }

        const runtime = timestamp - startTime;
        const relativeProgress = runtime / duration;
        const easedProgress = easing(relativeProgress);
        const easedDegrees = totalDegreesToTurn * Math.min(easedProgress, 1);

        document.documentElement.style.setProperty('--gradient-angle', `${easedDegrees}deg`);

        if (runtime < duration) {
          rafId = requestAnimationFrame(turnGradient);
        }
      };

      document.fonts.status === "loaded" || (await document.fonts.ready);

      setTimeout(() => rafId = requestAnimationFrame(turnGradient), 500);
    }

    gradientEffect();

    return () => {
      cancelAnimationFrame(rafId);
    }
  }, []);

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
              <span className="relative z-30 text-gray-900 outlined-text">
                Alex MacArthur
              </span>
              <span className="absolute z-30 text-gray-900 left-0 top-0 gradient-text">
                Alex MacArthur
              </span>
            </h1>
            <span className="pl-2 md:pl-0 text-2xl md:text-4xl leading-10 inline-block mt-1 text-gray-500">is a web developer in Nashville-ish, TN.</span>
          </div>
        </main>
      </div>
    </>
  )
}
