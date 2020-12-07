import { useEffect, forwardRef, useState } from 'react';
import BezierEasing from 'bezier-easing';
import Link from 'next/link';

const Logo = ({strokeWith = 3, asLink = false}) => {
  const [angle, setAngle] = useState(null);

  const getCurrentAngle = () => {
    const rawValue = document.documentElement.style.getPropertyValue("--gradient-angle");

    return Number(rawValue.replace('deg', ''));
  }

  useEffect(() => {
    setAngle(getCurrentAngle());

    let rafId = 0;
    let startTime = null;
    const duration = 500;
    const totalDegreesToTurn = 10;
    const easing = BezierEasing(.7, .33, .3, .62);
    const startDelay = 500;

    let iterations = 0;

    const gradientEffect = async () => {
      const turnGradient = (timestamp) => {
        if (!startTime) {
          startTime = timestamp;
        }

        console.log(startTime);

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

      setTimeout(() => rafId = requestAnimationFrame(turnGradient), startDelay);
    }

    gradientEffect();

    return () => {
      cancelAnimationFrame(rafId);
    }
  }, []);

  const children = (
    <>
      <span className="relative z-30 text-gray-900" style={{
        WebkitTextStroke: `${strokeWith}px white`
      }}>
        Alex MacArthur
      </span>
      <span className="absolute z-30 text-gray-900 left-0 top-0 gradient-text">
        Alex MacArthur
      </span>
    </>
  )

  if(asLink) {
    const LogoLink = forwardRef(({ href }, ref) => {
      return (
        <span className="relative block">
          <a href={href} ref={ref}>
            { children }
          </a>
        </span>
      )
    })

    return (
      <Link href="/" passHref>
        <LogoLink />
      </Link>
    )
  }

  return (
    <span className="relative block">
      { children }
    </span>
  );
};

export default Logo;
