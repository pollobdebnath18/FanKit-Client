import Banner from "../../components/homepage/Banner";
import FAQ from "../../components/homepage/FAQ";
import Service from "../../components/homepage/Service";
import Testimonials from "../../components/homepage/Testimonials";
import Footer from "../../components/shared/Footer";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Service />
      <Testimonials></Testimonials>
      <FAQ></FAQ>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
