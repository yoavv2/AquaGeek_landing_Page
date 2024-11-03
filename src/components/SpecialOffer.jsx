import React from 'react';

const SpecialOffer = () => (
  <section className='my-8 bg-gradient-to-r from-blue-700 to-green-500 text-white p-8 rounded-lg shadow-lg'>
    <h3 className='text-3xl font-bold text-center mb-4'>
      הצעה מיוחדת – לזמן מוגבל בלבד!
    </h3>
    <p className='text-xl text-center mb-4'>ייעוץ חינם לכל פנייה החודש</p>
    <p className='text-center mb-8'>
      הזדמנות לקבל ייעוץ ראשוני ללא עלות וללא התחייבות. גלה איך נוכל לעצב עבורך
      פינת טבע מרגיעה בהתאמה אישית לבית או למשרד שלך!
    </p>
    <div className='text-center'>
      <a
        href='#contact'
        className='inline-block bg-yellow-400 text-blue-800 py-3 px-8 rounded-full text-lg font-semibold hover:bg-yellow-500 transition duration-300 transform hover:scale-105'
      >
        קבל ייעוץ חינם
      </a>
    </div>
  </section>
);

export default SpecialOffer;
