import React from 'react';
import { Fish, Wrench, Package, HelpCircle } from 'lucide-react';

const services = [
  {
    title: 'תכנון והקמת אקווריומים',
    description:
      'עיצוב והתקנת אקווריומים מותאמים אישית לבתים פרטיים, משרדים, מסעדות וקליניקות. כולל ייעוץ מקצועי, בחירת ציוד, והתקנה מלאה.',
    icon: <Fish className='h-8 w-8 text-[--primary]' />,
  },
  {
    title: 'שירותי תחזוקה',
    description:
      'תחזוקה שוטפת ומקצועית של אקווריומים ובריכות נוי, כולל ניקוי, בדיקות מים, טיפול בדגים וצמחייה, ופתרון בעיות.',
    icon: <Wrench className='h-8 w-8 text-[--primary]' />,
  },
  {
    title: 'מכירת ציוד ואביזרים',
    description:
      'מגוון רחב של ציוד איכותי לאקווריומים, כולל מסננים, תאורה, מזון לדגים, צמחים, ואביזרי עיצוב מהמותגים המובילים.',
    icon: <Package className='h-8 w-8 text-[--primary]' />,
  },
  {
    title: 'ייעוץ והדרכה',
    description:
      'ליווי מקצועי מקיף לבעלי אקווריומים, כולל הדרכה על תחזוקה נכונה, טיפול בדגים, ופתרון בעיות שכיחות.',
    icon: <HelpCircle className='h-8 w-8 text-[--primary]' />,
  },
];

const OurServices = () => {
  return (
    <section className='services'>
      <div className='container'>
        <h2>השירותים שלנו</h2>
        <div className='services-grid'>
          {services.map((service, index) => (
            <div key={index} className='service-card'>
              <div className='service-icon'>{service.icon}</div>
              <div className='service-content'>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .services {
          padding: 5rem 0;
          background-color: var(--background);
          direction: rtl;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        h2 {
          text-align: center;
          color: var(--primary-dark);
          font-size: 2.5rem;
          margin-bottom: 3rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
          gap: 2rem;
        }

        .service-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-5px);
        }

        .service-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .service-content {
          text-align: center;
        }

        h3 {
          color: var(--primary-dark);
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        p {
          color: var(--text);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .services {
            padding: 3rem 0;
          }

          h2 {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default OurServices;
