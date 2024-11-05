import React, { type FC } from 'react';
import ContactDrawer from './ContactDrawer';

const SpecialOffer: FC = () => {
  return (
    <section className='p-8 my-8 text-white rounded-lg shadow-lg bg-gradient-to-r from-blue-700 to-green-500'>
      <h3 className='mb-4 text-3xl font-bold text-center'>
        הצעה מיוחדת – לזמן מוגבל בלבד!
      </h3>
      <p className='mb-4 text-xl text-center'>ייעוץ חינם לכל פנייה החודש</p>
      <p className='mb-8 text-center'>
        הזדמנות לקבל ייעוץ ראשוני ללא עלות וללא התחייבות. גלה איך נוכל לעצב
        עבורך פינת טבע מרגיעה בהתאמה אישית לבית או למשרד שלך!
      </p>
      <div className='text-center'>
        <ContactDrawer triggerText='קבל ייעוץ חינם'  />
      </div>
    </section>
  );
};

export default SpecialOffer;
