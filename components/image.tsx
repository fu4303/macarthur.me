import React, { useState, useRef, useEffect } from 'react';

const getObserver = (imageElement, callback: () => any) => {
  const options = {
    rootMargin: '100px',
    threshold: 1.0
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(imageElement);
        callback();
      }
    });
  }, options);

  return {
    observe: () => observer.observe(imageElement),
    kill: () => observer.observe(imageElement)
  }
}

const Image = ({ src, alt = "", height = null, width = null }) => {
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const { kill, observe } = getObserver(imageRef.current, () => {
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    });

    observe();

    return () => {
      kill();
    }
  }, []);

  return (
    <span>
      { isLoaded &&
        <img
          ref={imageRef}
          src={src}
          alt={alt}
        />
      }

      { !isLoaded &&
        <img
          ref={imageRef}
          src={`http://placekitten.com/g/200/300`}
          alt={alt}
        />
      }
    </span>
  )
}

export default Image;
