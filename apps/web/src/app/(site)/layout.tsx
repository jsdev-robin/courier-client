import React from 'react';
import Footer from '../../components/site/layouts/Footer';
import Header from '../../components/site/layouts/Header';

const SiteLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="space-y-10">{children}</main>
      <Footer />
    </>
  );
};

export default SiteLayout;
