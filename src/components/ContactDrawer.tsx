import React, { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import confetti from 'canvas-confetti';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerOverlay,
} from './ui/Drawercontent';

interface ContactDrawerProps {
  triggerText: string;
  buttonClassName?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactDrawer: React.FC<ContactDrawerProps> = ({
  triggerText,
  buttonClassName,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isClient) return;

    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);

      // Show success animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (!isClient) {
    return (
      <button
        className={
          buttonClassName || 'px-4 py-2 text-white bg-blue-500 rounded'
        }
      >
        {triggerText}
      </button>
    );
  }

  return (
    <Drawer open={showModal} onClose={() => setShowModal(false)}>
      <DrawerTrigger asChild>
        <button
          onClick={() => setShowModal(true)}
          className={
            buttonClassName ||
            'inline-block px-8 py-3 text-lg font-semibold text-blue-800 transition duration-300 transform bg-yellow-400 rounded-full hover:bg-yellow-500 hover:scale-105'
          }
        >
          {triggerText}
        </button>
      </DrawerTrigger>
      <DrawerOverlay className='inset-0 z-50 transition-opacity duration-300 bg-black/40' />
      <DrawerContent
        className={`fixed ${
          isMobile
            ? 'inset-x-0 bottom-0'
            : 'inset-0 justify-center items-center'
        } z-50 mt-24 flex h-auto flex-col rounded-t-[20px] border-none shadow-lg transition-transform duration-500 ease-in-out transform-gpu`}
      >
        {isMobile ? (
          <div className='mx-auto mt-4 h-1 w-[100px] rounded-full bg-gray-300' />
        ) : null}
        <div className='p-8 mx-auto w-full max-w-lg bg-white rounded-lg'>
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
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label htmlFor='name' className='block mb-1 font-medium'>
                שם מלא
              </label>
              <input
                type='text'
                id='name'
                name='name'
                required
                value={formData.name}
                onChange={handleInputChange}
                className='px-3 py-2 w-full rounded-md border'
                dir='rtl'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-1 font-medium'>
                אימייל
              </label>
              <input
                type='email'
                id='email'
                name='email'
                required
                value={formData.email}
                onChange={handleInputChange}
                className='px-3 py-2 w-full rounded-md border'
                dir='rtl'
              />
            </div>
            <div>
              <label htmlFor='phone' className='block mb-1 font-medium'>
                טלפון
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                required
                value={formData.phone}
                onChange={handleInputChange}
                className='px-3 py-2 w-full rounded-md border'
                dir='rtl'
              />
            </div>
            <div>
              <label htmlFor='message' className='block mb-1 font-medium'>
                הודעה
              </label>
              <textarea
                id='message'
                name='message'
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className='px-3 py-2 w-full rounded-md border'
                dir='rtl'
              />
            </div>
            <button
              type='submit'
              className='w-full px-4 py-2 text-white bg-[--primary] rounded-md hover:bg-[--primary-dark] transition-colors'
            >
              שלח
            </button>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ContactDrawer;
