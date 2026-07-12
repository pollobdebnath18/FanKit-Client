import Banner from "../../components/homepage/Banner";
import Blogs from "../../components/homepage/Blogs";
import FAQ from "../../components/homepage/FAQ";
import NewArrivals from "../../components/homepage/NewArrivals";
import Newsletter from "../../components/homepage/Newsletter";
import PopularJerseys from "../../components/homepage/PopularJerseys";
import Service from "../../components/homepage/Service";
import Statistics from "../../components/homepage/Statistics";
import Testimonials from "../../components/homepage/Testimonials";
import Footer from "../../components/shared/Footer";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Banner />

      {/* Product Showcase */}
      <PopularJerseys />
      <NewArrivals />
      <Service />

      {/* Social Proof & Trust */}
      <Statistics />
      <Testimonials />

      {/* Engagement & Support */}
      <Blogs />
      <FAQ />

      {/* Conversions & Footer */}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
