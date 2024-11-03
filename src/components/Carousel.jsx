import React, { useState, useEffect, useCallback } from 'react';

const images = [
  { id: 1, src: '/gallery_image1.jpg', alt: 'Image 1' },
  { id: 2, src: '/gallery_image2.jpg', alt: 'Image 2' },
  { id: 3, src: '/gallery_image3.png', alt: 'Image 3' },
  { id: 4, src: '/gallery_image4.png', alt: 'Image 4' },
  { id: 5, src: '/gallery_image5.jpg', alt: 'Image 5' },
  { id: 6, src: '/gallery_image6.jpg', alt: 'Image 6' },
  { id: 7, src: '/gallery_image7.jpg', alt: 'Image 7' },
];

export default function Carousel({ options = { loop: true } }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const goToNextSlide = useCallback(() => {
    const nextIndex = (currentIndex - 1) % images.length;
    goToSlide(nextIndex);
  }, [currentIndex, goToSlide]);

  const goToPrevSlide = useCallback(() => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(prevIndex);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (options.loop) {
      const timer = setInterval(goToNextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [goToNextSlide, options.loop]);

  return (
    <div className='max-w-3xl px-4 py-8 mx-auto'>
      <h2 className='text-[2.5rem] text-center text-[--primary-dark] mb-6'>
        גלריית פרויקטים שלנו: דוגמאות נבחרות מהעיצובים המרהיבים שלנו
      </h2>
      <div className='relative overflow-hidden aspect-video'>
        <div
          className='flex h-full transition-transform duration-300 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              className='flex-shrink-0 w-full h-full'
              key={image.id}
              style={{ left: `${index * 100}%`, position: 'absolute' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className='object-cover w-full h-full rounded-lg'
              />
            </div>
          ))}
        </div>

        <div className='absolute inset-0 flex items-center justify-between pointer-events-none'>
          <button
            onClick={goToPrevSlide}
            className='p-2 text-gray-800 transition-colors rounded-full shadow-md pointer-events-auto bg-white/80 hover:bg-white'
            aria-label='Previous slide'
          >
            ‹
          </button>
          <button
            onClick={goToNextSlide}
            className='p-2 text-gray-800 transition-colors rounded-full shadow-md pointer-events-auto bg-white/80 hover:bg-white'
            aria-label='Next slide'
          >
            ›
          </button>
        </div>
      </div>
      <div className='flex justify-center gap-2 mt-4'>
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full p-0 ${
              currentIndex === index ? 'bg-[--primary-dark]' : 'bg-gray-300'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
