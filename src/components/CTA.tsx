import React, { type FC } from 'react';
import ContactDrawer from './ContactDrawer';

const ContactModal: FC = () => {
  return (
    <section className='py-20 text-center text-white bg-[--primary]'>
      <div className='max-w-6xl px-4 mx-auto'>
        <h2 className='mb-4 text-4xl'>מוכנים להתחיל?</h2>
        <p className='mb-8 text-xl'>צור קשר עכשיו וקבל יעוץ ראשוני חינם</p>
        <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
          <a
            href='https://wa.me/972526383226?text=שלום, אני מעוניין בקבלת יעוץ.'
            target='_blank'
            rel='noopener noreferrer'
            className='w-full px-6 py-3 font-semibold text-white transition-all bg-green-600 rounded-md hover:bg-[#166534] sm:w-auto'
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
