const Contact = () => {
  return (
    <div className="bg-[#F5F7FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0B1F3A] via-[#1A3A5C] to-[#0D3060] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-5 text-center relative z-10">
          <span className="inline-block uppercase tracking-widest text-sm text-[#F5A623] font-semibold mb-4">
            Reach Out
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            Contact <span className="text-[#F5A623]">Us</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-200">
            Have a question about our jerseys or your order? We'd love to hear
            from you. Get in touch with our team anytime.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#F5A623]">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-8">Get In Touch</h2>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-2xl flex-shrink-0">
                  📍
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#0B1F3A]">Address</h3>
                  <p className="text-gray-600">Sylhet, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-2xl flex-shrink-0">
                  📞
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#0B1F3A]">Phone</h3>
                  <p className="text-gray-600">+880 1234-567890</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-2xl flex-shrink-0">
                  ✉️
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#0B1F3A]">Email</h3>
                  <p className="text-gray-600">support@fankit.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[#F5A623]/15 flex items-center justify-center text-2xl flex-shrink-0">
                  🕒
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#0B1F3A]">Working Hours</h3>
                  <p className="text-gray-600">Monday - Saturday</p>
                  <p className="text-gray-600">9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#0B1F3A]">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-8">Send Message</h2>

            <form className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Message</label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0B1F3A] to-[#1A3A5C] hover:from-[#1A3A5C] hover:to-[#0D3060] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Map — Sylhet, Bangladesh */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[#F5A623]">
            <div className="px-8 pt-6 pb-2">
              <h2 className="text-2xl font-bold text-[#0B1F3A] flex items-center gap-2">
                <span>📍</span> Our Location — Sylhet, Bangladesh
              </h2>
            </div>
            <iframe
              title="FanKit Location — Sylhet, Bangladesh"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115983.84855255563!2d91.79902854638671!3d24.899796900000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751ab0000000001%3A0x4b2d4b2d4b2d4b2d!2sSylhet%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1721480000000!5m2!1sen!2sbd"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
