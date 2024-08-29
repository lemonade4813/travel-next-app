// "use client"

// import { useEffect, useState } from "react";
// import A from '@/asset/79026ca47a77c48e37c1afb425b80566_RtxaVP4jOakhYzo6m2edDPv.jpg'
// import B from '@/asset/hhh.jpeg'
// import Image from "next/image";


// const images = [
//     A,
//     B,
//   ];

// export default function carousel(){

//     const [currentSlide, setCurrentSlide] = useState(0);

//   const showSlide = (index: number) => {
//     const totalSlides = images.length;
//     if (index >= totalSlides) {
//       setCurrentSlide(0);
//     } else if (index < 0) {
//       setCurrentSlide(totalSlides - 1);
//     } else {
//       setCurrentSlide(index);
//     }
//   };
  
//   const nextSlide = () => {
//     showSlide(currentSlide + 1);
//   };

//   const prevSlide = () => {
//     showSlide(currentSlide - 1);
//   };


//     useEffect(() => {
//         const handleResize = () => {
//           const carouselImages = document.querySelectorAll<HTMLImageElement>('.carousel img');
//           carouselImages.forEach(image => {
//             image.style.height = `${window.innerWidth * 0.15}px`;
//           });
//           showSlide(currentSlide);
//         };
//         window.addEventListener('resize', handleResize);
    
//         handleResize(); // 초기 높이 설정
    
//         return () => {
//           window.removeEventListener('resize', handleResize);
//         };
//       }, [currentSlide]);


//     return(
//         <div className="relative w-screen overflow-hidden">
//       <div className="carousel flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${-currentSlide * window.innerWidth}px)` }}>
//         {images.map((src, index) => (
//           <Image key={index} src={src} alt={`Slide ${index + 1}`} className="w-screen" />
//         ))}
//       </div>
//       <button className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 left-2" onClick={prevSlide}>&#10094;</button>
//       <button className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 right-2" onClick={nextSlide}>&#10095;</button>
//     </div>
//     )
// }

"use client"

import React, { useEffect, useState } from 'react';
import BgImage1 from "../../asset/bg_1.jpg";
import BgImage2 from "../../asset/bg_2.jpg";
import BgImage3 from "../../asset/bg_3.jpg";
import Image from 'next/image';

const images = [
  BgImage1,
  BgImage2,
  BgImage3
];

const Carousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrev = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
  
    const handleNext = () => {
      const isLastSlide = currentIndex === images.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
  
      return () => clearInterval(interval);
    }, [currentIndex]);
  
    return (
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative w-full flex-shrink-0">
              <Image
                src={image}
                alt={`Slide ${index}`}
                className="w-full"
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
          ))}
        </div>
  
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2"
          onClick={handlePrev}
        >
          {"<"}
        </button>
        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 p-2"
          onClick={handleNext}
        >
          {">"}
        </button>
      </div>
    );
  };
  
  export default Carousel;