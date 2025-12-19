import HomeCTA from '@/components/site/main/home/HomeCTA';
import HomeHero from '@/components/site/main/home/HomeHero';
import HomeHowItWork from '@/components/site/main/home/HomeHowItWork';
import HomeWhyChoose from '@/components/site/main/home/HomeWhyChoose';

const page = () => {
  return (
    <>
      <HomeHero />
      <HomeWhyChoose />
      <HomeHowItWork />
      <HomeCTA />
    </>
  );
};

export default page;
