import React, { type FC } from 'react';
import ContactDrawer from './ContactDrawer';



const ContactModal: FC = () => {
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
          <ContactDrawer
            triggerText='השאר פרטים'
            buttonClassName='px-6 py-3 font-semibold text-white transition-all bg-transparent border-2 border-white rounded-md hover:bg-white hover:bg-opacity-10'
          />
        </div>
      </div>
    </section>
  );
};

export default ContactModal;
