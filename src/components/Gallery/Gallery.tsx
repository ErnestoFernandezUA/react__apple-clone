import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { GalleryItem } from '../GalleryItem';
import image1 from '../../assets/images/1.jpg';
import image2 from '../../assets/images/2.avif';
import image3 from '../../assets/images/3.avif';
import './Gallery.scss';

interface GalleryProps {
  isReverse?: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ isReverse }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState<number | undefined>(0);
  const [visibleList, setVisibleList] = useState<string[]>([]);

  useLayoutEffect(() => {
    setVisibleList([image1, image2, image3]);
  }, [])

  useLayoutEffect(() => {
    
    const updateTrackWidth = () => {
      console.log('useEffect', visibleList, trackRef.current?.offsetWidth);
      if (trackRef.current) {
        console.log('setTrackWidth(trackRef.current.offsetWidth)');
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };
    
    updateTrackWidth(); 
  
    window.addEventListener("resize", updateTrackWidth);
  
    return () => {
      window.removeEventListener("resize", updateTrackWidth);
    };
  }, [trackRef.current?.offsetWidth]);
  
  // useEffect(() => {
  //   let animationFrameId: number;
  
  //   const updateTrackPosition = () => {
  //     if (trackRef.current) {
  //       const trackRect = trackRef.current.getBoundingClientRect();
  //       console.log('Track position (left):', trackRect.left);
  //     }
  //     animationFrameId = requestAnimationFrame(updateTrackPosition);
  //   };
  
  //   updateTrackPosition();
  
  //   return () => {
  //     cancelAnimationFrame(animationFrameId);
  //   };
  // }, []);


  // console.log(trackRef, 'trackWidth', trackWidth,'!!!',  trackRef.current?.offsetWidth, 'window.innerWidth', window.innerWidth);

  // console.log('ref', trackRef.current?.offsetWidth);
  console.log('render', visibleList, trackRef.current?.offsetWidth);

  const isMoving = Boolean(trackWidth && trackWidth > window.innerWidth);
  const isMovingReverse = Boolean(isMoving && isReverse);

  // console.log('isMoving = ', isMoving);
  // console.log('isMovingReverse = ', isMovingReverse);
  // console.log('offsetLeft', trackRef.current?.offsetLeft);

  const click = () => {
    setVisibleList([image3, image2, image1, image3, image2, image1]);
  };

  return (
    <div className="Gallery">
      <div 
        className={classNames("Gallery-track",
          {'Gallery-track--moving': isMoving},
          {'Gallery-track--moving-reverse': isMovingReverse},
        )}
        ref={trackRef}
      >
        {visibleList.map((img, i) => <GalleryItem img={img} key={i}/>)}

        {/* <GalleryItem img={image1} />
        <GalleryItem img={image1} />
        <GalleryItem img={image1} />
        <GalleryItem img={image1} /> */}
      </div>

      <p>Width: {trackWidth} {trackRef.current?.offsetWidth}</p>

      <button
        onClick={click}
      >click</button>
    </div>
  );
}
