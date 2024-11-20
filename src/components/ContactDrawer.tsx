import React, { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import confetti from 'canvas-confetti';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerOverlay,
  DrawerTitle,
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
              className='float-right text-2xl text-gray-600 cursor-pointer hover:text-gray-900'
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
          </DrawerClose>
          <DrawerTitle className='mb-6 text-3xl font-semibold text-center text-gray-800'>
            השאר פרטים ונחזור אליך בהקדם
          </DrawerTitle>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='איך תרצה שנקרא לך?'
              required
              value={formData.name}
              onChange={handleInputChange}
              className='p-3 mb-4 w-full text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='email'
              id='email'
              name='email'
              placeholder='כתובת המייל לקבלת עדכונים'
              required
              value={formData.email}
              onChange={handleInputChange}
              className='p-3 mb-4 w-full text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='tel'
              id='phone'
              name='phone'
              placeholder='מספר נייד לייעוץ מהיר'
              required
              value={formData.phone}
              onChange={handleInputChange}
              className='p-3 mb-4 w-full text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              style={{ textAlign: 'right' }}
            />
            <textarea
              id='message'
              name='message'
              placeholder='איך נוכל לעזור? שתף אותנו בכל מה שבא לך'
              value={formData.message}
              onChange={handleInputChange}
              className='p-3 mb-4 w-full text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            ></textarea>

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
