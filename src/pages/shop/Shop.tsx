import {
  FaArrowRight,
  FaShieldAlt,
  FaShippingFast,
  FaUndoAlt,
} from "react-icons/fa";
import { Link } from "react-router";

const Shop = () => {
  return (
    <section className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.3em] text-sm text-blue-100 mb-3">
              Official Football Jerseys
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Wear Your Team.
              <br />
              Live The Game.
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Explore premium football jerseys inspired by the biggest clubs and
              national teams. Authentic style, premium quality and worldwide
              passion.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/collections"
                className="btn bg-white text-blue-700 hover:bg-slate-100 border-none"
              >
                Browse Collection
                <FaArrowRight />
              </Link>

              <Link
                to="/about"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-700"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
              <FaShippingFast />
            </div>

            <h3 className="mt-6 text-xl font-semibold">Fast Delivery</h3>

            <p className="mt-3 text-gray-500">
              Quick shipping with reliable packaging to keep your jersey safe.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
              <FaShieldAlt />
            </div>

            <h3 className="mt-6 text-xl font-semibold">Premium Quality</h3>

            <p className="mt-3 text-gray-500">
              Carefully selected fabrics with comfort and durability in mind.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-2xl">
              <FaUndoAlt />
            </div>

            <h3 className="mt-6 text-xl font-semibold">Easy Returns</h3>

            <p className="mt-3 text-gray-500">
              Hassle-free return policy for a worry-free shopping experience.
            </p>
          </div>
        </div>
      </div>

      {/* About */}

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-sm p-10 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                More Than Just Jerseys
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                FanKit is built for football lovers who want to represent their
                favorite teams with confidence. Whether you're cheering from the
                stadium or watching from home, our collection helps you stay
                connected to the game.
              </p>

              <p className="mt-4 text-gray-600 leading-8">
                Browse hundreds of jerseys from international teams, club
                legends, and special edition collections.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-2xl bg-blue-50 p-8">
                <h3 className="text-4xl font-bold text-blue-600">100+</h3>

                <p className="mt-2 text-gray-600">Jerseys Available</p>
              </div>

              <div className="rounded-2xl bg-cyan-50 p-8">
                <h3 className="text-4xl font-bold text-cyan-600">50+</h3>

                <p className="mt-2 text-gray-600">National Teams</p>
              </div>

              <div className="rounded-2xl bg-green-50 p-8">
                <h3 className="text-4xl font-bold text-green-600">5★</h3>

                <p className="mt-2 text-gray-600">Customer Rating</p>
              </div>

              <div className="rounded-2xl bg-orange-50 p-8">
                <h3 className="text-4xl font-bold text-orange-600">24/7</h3>

                <p className="mt-2 text-gray-600">Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}

      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">Ready to Find Your Jersey?</h2>

          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Explore our complete collection and discover your favorite team's
            latest jerseys.
          </p>

          <Link to="/collections" className="btn btn-primary mt-8">
            Explore Collection
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Shop;
