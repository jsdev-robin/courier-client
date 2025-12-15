import Header from '@/components/site/panel/dashboard/layouts/Header';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="py-4">{children}</main>
    </>
  );
};

export default RootLayout;
