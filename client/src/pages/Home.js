import FeatureProduct from "../components/FeatureProduct";
import HeroSection from "../components/HeroSection";
import Services from "../components/Services";
import Trusted from "../components/Trusted";

const Home = () => {
  const data = {
    name: "Libaas store",
    detail:
      "Welcome to Libaas store, your premier destination for all things libaas (traditional clothing). Discover a world of elegance and style as you browse through our curated collection of exquisite libaas that seamlessly blend tradition with contemporary fashion. From timeless classics to the latest trends, we take pride in offering a diverse range of high-quality garments that cater to every taste and occasion. Embrace the richness of cultural heritage with our meticulously crafted attire, designed to make you look and feel your best. Experience the beauty of libaas like never before at Libaas store.",
    image: './images/2.jpg',
  };

  return (
    <>
      <HeroSection myData={data} />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
