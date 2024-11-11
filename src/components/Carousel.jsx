import React, { useState, useEffect, useCallback } from 'react';

const newImageSources = [
  'https://aqua-geek-landing-page.vercel.app/carousel_image_1.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_2.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_3.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_4.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_5.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_6.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_7.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_8.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_9.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_10.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_11.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_12.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_13.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_14.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_15.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_16.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_17.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_18.jpeg',
  'https://aqua-geek-landing-page.vercel.app/carousel_image_19.jpeg',
];

const images = newImageSources.map((src, index) => ({
  id: index + 1,
  src: src,
  alt: `project ${index + 1}`,
}));

export default function Carousel({ options = { loop: true } }) {
  const [currentIndex, setCurrentIndex] = useState(images.length - 1);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const goToNextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    goToSlide(nextIndex);
  }, [currentIndex, goToSlide]);

  const goToPrevSlide = useCallback(() => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(prevIndex);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (options.loop) {
      const timer = setInterval(goToPrevSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [goToPrevSlide, options.loop]);

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
