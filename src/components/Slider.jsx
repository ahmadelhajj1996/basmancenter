// import  { useState, useEffect, useCallback } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import First from "../assets/First.png";
// import Second from "../assets/Second.png";

// const defaultImages = [
//   {
//     id: 1,
//     url: First,
//     alt: "Mountain landscape with lake",
//     title: "Mountain Landscape",
//   },
//   {
//     id: 2,
//     url: Second,
//     alt: "Northern lights over mountains",
//     title: "Northern Lights",
//   },

// ];

// const Slider = ({ images = defaultImages, autoPlayInterval = 5000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   console.log(defaultImages[0].url.First)

//   const nextSlide = useCallback(() => {
//     setCurrentIndex((current) =>
//       current === images.length - 1 ? 0 : current + 1,
//     );
//   }, [images.length]);

//   useEffect(() => {
//     let intervalId;

//     if (isAutoPlaying && images.length > 1) {
//       intervalId = setInterval(() => {
//         nextSlide();
//       }, autoPlayInterval);
//     }

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [isAutoPlaying, autoPlayInterval, nextSlide, images.length]);

//   useEffect(() => {
//     const nextIndex = (currentIndex + 1) % images.length;
//     const img = new Image();
//     img.src = images[nextIndex].url;
//   }, [currentIndex, images]);

//   return (
//     <div className="relative w-full mx-auto overflow-hidden bg-gray-900 shadow-2xl">
//       <div className="relative h-[400px]  transition-all duration-300">
//         {images.map((image, index) => (
//           <div
//             key={image.id}
//             className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
//               index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
//             }`}
//           >
//             <img
//               src={image.url}
//               alt={image.alt}
//               className="w-full h-[400px]"
//               loading={index === 0 ? "eager" : "lazy"}
//             />

//               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
//                 <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold">
//                   {image.title}
//                 </h3>
//                 <p className="text-gray-200 text-sm md:text-base mt-1">
//                   {image.alt}
//                 </p>
//               </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;

import React from 'react'

function Slider() {
  return (
    <div>
      
    </div>
  )
}

export default Slider
