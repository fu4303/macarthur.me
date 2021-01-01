import React, { useState, useRef, useEffect } from 'react';

function isImageLoaded(imgElement) {
  return imgElement.complete && imgElement.naturalHeight !== 0;
}

const Image = ({src, alt = ""}) => {
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isImageLoaded(imageRef.current)) {
      setImageLoaded(true);
    }
  }, [])

  return (
    <span>
      { imageLoaded &&
        <img
          ref={imageRef}
          src={src}
          alt={alt}
        />
      }

      { !imageLoaded &&
        <img
          ref={imageRef}
          src={`${src}?lqip`}
          alt={alt}
          onLoad={() => setImageLoaded(true)}
        />
      }
    </span>
  )
}

export default Image;
