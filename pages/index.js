import Head from 'next/head';
import Meta from '../components/meta'
import Nav from '../components/Nav';
import { useEffect } from 'react';
import BezierEasing from 'bezier-easing';

export default function Index() {

  useEffect(() => {
    let rafId = 0;
    let duration = 500;
    const easing = BezierEasing(1, 0.5, 0, 1); // Create the easing function based on https://easings.net/en#easeInSine

    const turnGradient = () => {
      rafId = requestAnimationFrame(() => {
        // const currentDegreeNumber = Number(getComputedStyle(document.documentElement).getPropertyValue('--gradient-angle').replace('deg', ''));
        // const newDegreeNumber = currentDegreeNumber + 1;
        const elapsedProgress = iteration - initialDegree;
        const relativeProgress = elapsedProgress / duration;
        const easedProgress = easing(relativeProgress);
        const left = duration * Math.min(easedProgress, 1);

        document.documentElement.style.setProperty('--gradient-angle', `${left}deg`);

        if(easedProgress < 1) {
          requestAnimationFrame(turnGradient);
        }
      })
    };

    setTimeout(() => {
      requestAnimationFrame(turnGradient)
    }, 500);

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
