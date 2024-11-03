import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import React from 'react';

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
  {
    question: 'האם יש אחריות על השירות?',
    answer:
      'כמובן! אנו מציעים אחריות על כל ההתקנות והשירותים שלנו, כך שתוכל להיות בטוח שהאקווריום שלך בידיים טובות.',
  },
];

const FAQ = () => {
  return (
    <section className='my-8'>
      <h2 className='text-3xl font-bold text-center text-[--primary-dark] mb-4'>
        שאלות נפוצות
      </h2>
      <Accordion type='single' collapsible className='space-y-4'>
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300'
          >
            <AccordionTrigger className='text-xl font-bold text-[--primary]'>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className='text-gray-700 mt-2'>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
