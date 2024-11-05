import React, { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerOverlay,
} from './ui/Drawercontent';

const ContactDrawer = ({ triggerText, buttonClassName }) => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseId = import.meta.env.PUBLIC_AIRTABLE_BASE_ID;
      const tableName = import.meta.env.PUBLIC_AIRTABLE_TABLE_NAME;
      const apiKey = import.meta.env.PUBLIC_AIRTABLE_API_KEY;

      const response = await fetch(
        `https://api.airtable.com/v0/${baseId}/${tableName}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: {
              Name: formData.name,
              Email: formData.email,
              Phone: formData.phone,
              Message: formData.message,
            },
          }),
        }
      );

      if (response.ok) {
        alert('הטופס נשלח בהצלחה!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        alert('שגיאה בשליחת הטופס, נסה שנית.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('שגיאה בשליחת הטופס, נסה שנית.');
    }
  };

  return (
    <Drawer>
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
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='איך תרצה שנקרא לך?'
              required
              value={formData.name}
              onChange={handleInputChange}
              className='w-full p-3 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <input
              type='email'
              id='email'
              name='email'
              placeholder='כתובת המייל לקבלת עדכונים'
              required
              value={formData.email}
              onChange={handleInputChange}
              className='w-full p-3 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <input
              type='tel'
              id='phone'
              name='phone'
              placeholder='מספר נייד לייעוץ מהיר'
              required
              value={formData.phone}
              onChange={handleInputChange}
              className='w-full p-3 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              style={{ textAlign: 'right' }}
            />

            <textarea
              id='message'
              name='message'
              placeholder='איך נוכל לעזור? שתף אותנו בכל מה שבא לך'
              value={formData.message}
              onChange={handleInputChange}
              className='w-full p-3 mb-4 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            ></textarea>
            <button
              type='submit'
              className='w-full px-6 py-3 mt-4 font-semibold text-white transition-all bg-gradient-to-r from-blue-700 to-green-500 rounded-md hover:bg-[--primary-dark] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
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
