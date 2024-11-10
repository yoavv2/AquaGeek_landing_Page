import React, { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isSuccess = false;

    try {
      // Send data to Airtable
      const baseId: string = import.meta.env.PUBLIC_AIRTABLE_BASE_ID as string;
      const tableName: string = import.meta.env
        .PUBLIC_AIRTABLE_TABLE_NAME as string;
      const apiKey: string = import.meta.env.PUBLIC_AIRTABLE_API_KEY as string;

      const airtableResponse = await fetch(
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

      if (airtableResponse.ok) {
        isSuccess = true;
      } else {
        const errorData = await airtableResponse.json();
        console.error('Error details:', errorData);
        alert('שגיאה בשליחת הטופס ל-Airtable, נסה שנית.');
      }
    } catch (error) {
      console.error('Error submitting the form to Airtable:', error);
    }

    try {
 
      const webhookUrl = import.meta.env.PUBLIC_WEBHOOK_URL as string;
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (webhookResponse.ok) {
        isSuccess = true;
      } else {
        console.error('Error sending data to webhook');
        alert('שגיאה בשליחת הטופס ל-Webhook, נסה שנית.');
      }
    } catch (error) {
      console.error('Error submitting the form to webhook:', error);
    }

    if (isSuccess) {
      alert('הטופס נשלח בהצלחה!');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setShowModal(false);
    } else {
      alert('שגיאה בשליחת הטופס, נסה שנית.');
    }
  };

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
