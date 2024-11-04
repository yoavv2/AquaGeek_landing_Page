import React from 'react';
import { Fish, Droplet, Heart } from 'lucide-react';

const services = [
  {
    title: 'אקווריומים ובריכות נוי בהתאמה אישית',
    description:
      'כל מערכת מתוכננת בקפידה, משלבת צמחייה, דגים ובעלי חיים בהתאמה מדויקת. אנו מביאים אליך את השקט של עולם המים – בעיצוב שיתאים באופן מושלם למרחב שלך.',
    icon: <Fish className='h-8 w-8 ml-1 text-[--primary]' />,
  },
  {
    title: 'תחזוקה מקצועית לבריאות ויציבות המערכת',
    description:
      'שירות התחזוקה השוטף שלנו כולל בדיקות מים מדויקות, טיפולים בציוד והתאמות לפי הצורך, כך שתוכל ליהנות ממערכת בריאה ומאוזנת לאורך זמן.',
    icon: <Droplet className='h-8 w-8 ml-1 text-[--primary]' />,
  },
  {
    title: 'שירות אישי ומסור',
    description:
      'מהשלב הראשון של התכנון ועד לתחזוקה השוטפת, אנו מלווים אותך במקצועיות ובמסירות. כל מה שצריך כדי שתוכל ליהנות ממערכת חיה ותוססת בביתך.',
    icon: <Heart className='h-8 w-8 ml-1 text-[--primary]' />,
  },
];

const OurServices = () => {
  return (
    <section className='my-8'>
      <h2 className='text-[2.5rem]  text-center text-[--primary-dark] mb-4'>
        מה תוכל למצוא אצלנו?
      </h2>
      <div className='grid gap-8 md:grid-cols-3'>
        {services.map((service, index) => (
          <div
            key={index}
            className='p-6 transition duration-300 bg-white rounded-lg shadow-md hover:shadow-lg'
          >
            <div className='flex items-center mb-4'>
              {service.icon}
              <h3 className=' text-[1.5rem] '>{service.title}</h3>
            </div>
            <p className='text-gray-700'>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
