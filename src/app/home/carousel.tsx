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