import { useEffect, forwardRef } from 'react';
import BezierEasing from 'bezier-easing';
import Link from 'next/link';
import { useRouter } from 'next/router';

const getAngleValue = (angleString) => {
  return Number(angleString.replace('deg', ''));
}

const getCurrentAngle = () => {
  const rawValue = getComputedStyle(document.documentElement).getPropertyValue("--gradient-angle");

  return getAngleValue(rawValue);
}

const Logo = ({strokeWith = 3, asLink = false}) => {
  const router = useRouter();

  useEffect(() => {
    let rafId = 0;
    let startTime = null;
    const startingAngle = getCurrentAngle();
    const duration = 750;
    const totalDegreesToTurn = 20;
    const startDelay = 300;
    const easing = BezierEasing(.65, .3, .3, 1);

    const gradientEffect = async () => {
      const turnGradient = (timestamp) => {
        if (!startTime) {
          startTime = timestamp;
        }

        const runtime = timestamp - startTime;
        const relativeProgress = runtime / duration;
        const easedProgress = easing(relativeProgress);
        const easedDegrees = totalDegreesToTurn * Math.min(easedProgress, 1);
        const newAngleFromStartingAngle = startingAngle + easedDegrees;

        document.documentElement.style.setProperty('--gradient-angle', `${newAngleFromStartingAngle}deg`);

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

  const constructedLogo = asLink
    ? (
      <a href={'/'} onClick={(e) => {
        e.preventDefault();

        router.push('/');
      }}>
        {children}
      </a>
    )
    : children

  return (
    <span className="relative block">
      { constructedLogo }
    </span>
  );
};

export default Logo;
