import React, { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerOverlay,
} from './ui/Drawercontent';

const ContactModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <section className='py-20 text-center text-white bg-[--primary]'>
      <div className='max-w-6xl px-4 mx-auto'>
        <h2 className='mb-4 text-4xl'>מוכנים להתחיל?</h2>
        <p className='mb-8 text-xl'>צור קשר עכשיו וקבל ייעוץ ראשוני חינם</p>
        <div className='flex justify-center gap-4'>
          <a
            href='https://wa.me/972526383226?text=שלום, אני מעוניין בקבלת ייעוץ.'
            target='_blank'
            rel='noopener noreferrer'
            className='px-6 py-3 font-semibold text-white transition-all bg-green-500 rounded-md hover:bg-green-600'
          >
            שלח הודעה בוואצאפ
          </a>
          <Drawer>
            <DrawerTrigger asChild>
              <button
                onClick={() => setShowModal(true)}
                className='px-6 py-3 font-semibold text-white transition-all bg-transparent border-2 border-white rounded-md hover:bg-white hover:bg-opacity-10'
              >
                השאר פרטים
              </button>
            </DrawerTrigger>
            <DrawerOverlay className='inset-0 z-50 transition-opacity duration-300 bg-black/40' />
            <DrawerContent
              className={`${
                isMobile ? 'inset-x-0 bottom-0' : 'inset-0 justify-center'
              } z-50 mt-24 h-auto flex-col rounded-t-[20px] border-none shadow-lg transition-transform duration-500 ease-in-out transform-gpu`}
              shouldScaleBackground={isMobile}
            >
              {isMobile ? (
                <div className='mx-auto mt-4 h-1 w-[100px] rounded-full bg-gray-300' />
              ) : (
                ''
              )}
              <div className='w-full max-w-lg p-8 mx-auto bg-white rounded-lg'>
                <DrawerClose asChild>
                  <span
                    className='float-right text-2xl font-bold text-gray-600 cursor-pointer hover:text-gray-900'
                    onClick={() => setShowModal(false)}
                  >
                    &times;
                  </span>
                </DrawerClose>
                <h3 className='mb-6 text-3xl font-semibold text-center text-gray-800'>
                  השאר פרטים
                </h3>
                <form>
                  <label
                    htmlFor='name'
                    className='block mb-2 font-semibold text-right text-gray-700'
                  >
                    שם:
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    required
                    className='w-full p-3 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <label
                    htmlFor='email'
                    className='block mb-2 font-semibold text-right text-gray-700'
                  >
                    אימייל:
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    className='w-full p-3 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <label
                    htmlFor='message'
                    className='block mb-2 font-semibold text-right text-gray-700'
                  >
                    הודעה:
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    required
                    className='w-full p-3 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  ></textarea>
                  <button
                    type='submit'
                    className='w-full px-6 py-3 mt-4 font-semibold text-white transition-all bg-[--primary] rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  >
                    שלח
                  </button>
                </form>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </section>
  );
};

export default ContactModal;
