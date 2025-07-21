import React, { useState } from 'react';

const faqs = [
  {
    question: "What types of organic products do you offer?",
    answer:
      "We offer a variety of organic products including fresh fruits, vegetables, dairy, grains, and processed goods sourced from certified organic farms.",
  },
  {
    question: "What happens if I'm not home during delivery?",
    answer:
      "If you're not available, we will contact you to reschedule delivery or leave the package in a safe location upon your request.",
  },
  {
    question: "Do I need an account to place an order?",
    answer:
      "You can browse our site without an account, but placing an order requires a quick signup to ensure secure tracking and delivery.",
  },
  {
    question: "Are cold items delivered safely?",
    answer:
      "Yes, we use insulated and temperature-controlled packaging to ensure freshness and safety during delivery.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our customer support via email at support@taja.com or call us at +977 9823097220 between 9AM–6PM.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white text-gray-800 pt-6 pb-12 px-4 md:px-10 lg:px-20 font-sans">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-green-800 mt-0">
        Frequently Asked Questions
      </h1>
      <p className="text-center max-w-2xl mx-auto text-gray-700 mb-14 text-lg leading-relaxed">
        Find answers to common questions about our organic products, services, and policies.
      </p>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded shadow-sm overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
            >
              <span className="font-semibold text-gray-800">{faq.question}</span>
              <span className="text-green-700 text-xl font-bold">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 bg-white border-t border-gray-100">
                <p className="text-gray-700 text-sm leading-relaxed pt-3">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
