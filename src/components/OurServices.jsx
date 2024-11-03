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
      <h3 className='text-3xl font-bold text-center text-[--primary-dark] mb-4'>
        מה תוכל למצוא אצלנו?
      </h3>
      <div className='grid md:grid-cols-3 gap-8'>
        {services.map((service, index) => (
          <div
            key={index}
            className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300'
          >
            <div className='flex items-center mb-4'>
              {service.icon}
              <h4 className='text-xl font-bold text-[--primary] ml-3'>
                {service.title}
              </h4>
            </div>
            <p className='text-gray-700'>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
