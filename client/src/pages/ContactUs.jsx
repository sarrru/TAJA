import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="bg-white text-gray-800 pt-6 pb-12 px-4 md:px-10 lg:px-20 font-sans">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-green-800 mt-0">
        You can ask us questions
      </h1>
      <p className="text-center max-w-2xl mx-auto text-gray-700 mb-14 text-lg leading-relaxed">
        Contact us for all your questions and opinions, or you can solve your problems faster with our support team.
      </p>

      {/* Contact Info & Form */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left - Contact Info */}
        <div className="space-y-6 text-base leading-relaxed text-gray-700">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Office</h3>
          <p className="text-gray-700">
            Visit us anytime for inquiries, feedback, or support. We&apos;re here to help and ensure your experience with <strong>TAJA</strong> is smooth.
          </p>
          <div className="space-y-2">
            <p><strong>📍 Address:</strong> Dhapakhel, Lalitpur, Nepal</p>
            <p><strong>📞 Phone:</strong> +02 1234 567 88</p>
            <p><strong>✉️ Email:</strong> taja@gmail.com</p>
          </div>
        </div>

        {/* Right - Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-sm mb-1">Your Name *</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1">Your Email *</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">Subject *</label>
            <input
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="How can we help you?"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us more..."
              rows="5"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-50 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className={`w-full py-3 px-6 rounded font-semibold text-white transition-all ${
              isSubmitted
                ? 'bg-green-500'
                : isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-700 hover:bg-green-800'
            }`}
          >
            {isSubmitting
              ? 'Sending...'
              : isSubmitted
              ? 'Message Sent ✓'
              : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Features */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose TAJA?</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
          {[
            { icon: '📦', title: 'Product Packing', desc: 'Eco-friendly packaging to keep your products fresh.' },
            { icon: '🕐', title: '24X7 Support', desc: 'Our team is always ready to help.' },
            { icon: '🚚', title: 'Delivery in 5 Days', desc: 'We deliver your order within 3–5 days.' },
            { icon: '🔐', title: 'Payment Secure', desc: 'Encrypted and safe payment process.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded shadow hover:shadow-md transition">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
