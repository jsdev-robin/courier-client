import HomeCTA from '../../components/site/pages/home/HomeCTA';
import HomeHowItWork from '../../components/site/pages/home/HomeHowItWork';
import HomeWhyChoose from '../../components/site/pages/home/HomeWhyChoose';
import HomHero from '../../components/site/pages/home/HomHero';

const HomePage = () => {
  return (
    <>
      <HomHero />
      <HomeWhyChoose />
      <HomeHowItWork />
      <HomeCTA />
    </>
  );
};

export default HomePage;
