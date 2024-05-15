import HeroSection from "../components/HeroSection";
import { useProductContext } from "../context/productcontex";

const About = () => {
  const { myName } = useProductContext();

  const data = {
    name: "About Libaas",
    detail :'At Libaas store, we believe that clothing is more than just fabric; its a statement of identity and culture. Our journey began with a passion for preserving and promoting the beauty of traditional attire, and today, we stand as a beacon of excellence in the world of libaas fashion. Committed to authenticity and craftsmanship, we source the finest materials and collaborate with skilled artisans to bring you libaas that narrate stories of tradition and modernity. Our commitment to customer satisfaction extends beyond the purchase, with personalized service that ensures you find the perfect ensemble for every occasion. Join us on a sartorial journey that celebrates the artistry of libaas, where every garment tells a tale of heritage and style.'
  };

  return (
    <>
      {myName}
      <HeroSection myData={data} />
    </>
  );
};

export default About;
