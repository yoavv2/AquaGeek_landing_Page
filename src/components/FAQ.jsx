import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    question: "מה כולל השירות של 'אקווה גיק' בעיצוב אקווריומים בהתאמה אישית?",
    answer:
      'השירות שלנו כולל את כל השלבים – מהתכנון הראשוני בהתאמה אישית לחלל שלך, דרך הקמה והתקנה מקצועית, ועד תחזוקה שוטפת כדי להבטיח את בריאות המערכת ויציבותה לאורך זמן.',
  },
  {
    question: 'האם אני יכול לבחור את סוגי הדגים והצמחייה?',
    answer:
      'בהחלט! אנו עובדים בצמוד איתך כדי לבחור את הדגים, הצמחייה ושאר מרכיבי המערכת כך שיתאימו לטעמך, לסגנון העיצובי של הבית, ולצרכים של האקווריום שלך.',
  },
  {
    question: 'כמה זמן לוקח להקים אקווריום חדש בבית?',
    answer:
      'משך ההקמה משתנה בהתאם לגודל הפרויקט ומורכבותו, אך בממוצע לוקח לנו בין שבועיים לחודש לסיים את כל שלבי התכנון וההתקנה כך שהאקווריום יהיה מוכן לפעולה.',
  },
  {
    question: 'מהי תדירות התחזוקה הנדרשת?',
    answer:
      'אנו ממליצים על תחזוקה שוטפת אחת לשבועיים עד חודש, תלוי בגודל המערכת וסוגי הדגים והצמחים. התחזוקה כוללת ניקיון, בדיקות מים, וטיפול בציוד כדי להבטיח שהאקווריום יישאר בריא ומאוזן.',
  },
];

const FAQ = () => {
  // Return early if we're on the server
  if (typeof window === 'undefined') {
    return null;
  }

  const [openItems, setOpenItems] = React.useState({});

  const handleToggle = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className='my-8'>
      <h2 className='text-[2.5rem] text-center text-[--primary-dark] mb-4'>
        שאלות נפוצות
      </h2>
      <Accordion type='single' collapsible className='space-y-4'>
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className='p-4 transition duration-300 bg-white rounded-lg shadow-md hover:shadow-lg'
          >
            <AccordionTrigger
              onClick={() => handleToggle(index)}
              className='flex items-center justify-between text-xl font-bold text-[--primary]'
            >
              <span>{faq.question}</span>
              {openItems[index] ? (
                <FiChevronUp className='ml-2 transition-transform duration-300' />
              ) : (
                <FiChevronDown className='ml-2 transition-transform duration-300' />
              )}
            </AccordionTrigger>
            <AccordionContent className='mt-2 text-gray-700'>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
