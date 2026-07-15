const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            About Jersey Store
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-100">
            We are passionate about bringing football fans closer to their
            favorite clubs by providing premium-quality jerseys from teams all
            around the world.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900"
              alt="Our Story"
              className="rounded-2xl shadow-lg w-full h-[420px] object-cover"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>

            <p className="text-gray-600 leading-8 mb-5">
              Jersey Store started with one mission—to provide authentic,
              stylish, and affordable football jerseys for passionate fans.
              Whether you're supporting your local club or your favorite
              international team, we've got you covered.
            </p>

            <p className="text-gray-600 leading-8">
              Today we proudly serve thousands of football lovers with premium
              jerseys, fast delivery, and outstanding customer support.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">Why Choose Us</h2>
            <p className="text-gray-500 mt-4">
              Trusted by football fans across the country.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-5xl mb-4">⚽</div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                High-quality materials with comfortable fitting and durable
                printing.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Nationwide shipping with quick and secure delivery service.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-xl font-semibold mb-3">Secure Payment</h3>
              <p className="text-gray-600">
                Safe and trusted payment methods with complete data protection.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-3">Customer Support</h3>
              <p className="text-gray-600">
                Friendly support team available whenever you need assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            <div>
              <h2 className="text-5xl font-bold">5K+</h2>
              <p className="mt-3 text-blue-100">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">200+</h2>
              <p className="mt-3 text-blue-100">Football Clubs</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">10K+</h2>
              <p className="mt-3 text-blue-100">Orders Delivered</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">99%</h2>
              <p className="mt-3 text-blue-100">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-5 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>

          <p className="text-lg text-gray-600 leading-8">
            Our mission is simple: make premium football jerseys accessible to
            every fan. We believe football is more than a game—it is passion,
            unity, and identity. That's why we are committed to offering the
            best quality products, excellent service, and an unforgettable
            shopping experience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
