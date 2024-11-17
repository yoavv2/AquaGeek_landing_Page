import React, { type FC } from 'react';
import ContactDrawer from './ContactDrawer';
import { contactConfig } from '../config/contact';

const ContactModal: FC = () => {
  const { number, message } = contactConfig.whatsapp;

  return (
    <section className='py-20 text-center text-white bg-[--primary]'>
      <div className='px-4 mx-auto max-w-6xl'>
        <h2 className='mb-4 text-4xl'>מוכנים להתחיל?</h2>
        <p className='mb-8 text-xl'>צור קשר עכשיו וקבל יעוץ ראשוני חינם</p>
        <div className='flex flex-col gap-4 items-center sm:flex-row sm:justify-center'>
          <a
            href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full px-6 py-3 font-semibold text-white transition-all bg-[#25D366] rounded-md hover:bg-green-600 sm:w-auto'
          >
            שלח הודעה בוואצאפ
          </a>
          <ContactDrawer
            triggerText='השאר פרטים'
            buttonClassName='w-full px-6 py-3 font-semibold text-white transition-all bg-transparent border-2 border-white rounded-md hover:bg-white hover:bg-opacity-10 sm:w-auto'
          />
        </div>
      </div>
    </section>
  );
};

export default ContactModal;
