import Banner from "../../components/homepage/Banner";
import ShopByTeam from "../../components/homepage/ShopByTeam";
import NewArrivals from "../../components/homepage/NewArrivals";
import PopularJerseys from "../../components/homepage/PopularJerseys";
import Service from "../../components/homepage/Service";
import Statistics from "../../components/homepage/Statistics";
import Testimonials from "../../components/homepage/Testimonials";
import FAQ from "../../components/homepage/FAQ";
// import Newsletter from "../../components/homepage/Newsletter";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Banner />

      {/* Browse by Team */}
      <ShopByTeam />

      {/* Product Showcase */}
      <NewArrivals />
      <PopularJerseys />
      <Service />

      {/* Social Proof & Trust */}
      <Statistics />
      <Testimonials />

      {/* Engagement & Support */}
      <FAQ />

      {/* Conversions & Footer */}
      {/* <Newsletter /> */}
    </div>
  );
};

export default HomePage;
