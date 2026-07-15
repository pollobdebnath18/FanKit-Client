const Contact = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-5">Contact Us</h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-100">
            Have a question about our jerseys or your order? We'd love to hear
            from you. Get in touch with our team anytime.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Get In Touch
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                  📍
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-600">Sylhet, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                  📞
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">+880 1234-567890</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                  ✉️
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">support@jerseystore.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                  🕒
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Working Hours</h3>
                  <p className="text-gray-600">Monday - Saturday</p>
                  <p className="text-gray-600">9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Send Message
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Map Placeholder */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
              Google Map Location
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
