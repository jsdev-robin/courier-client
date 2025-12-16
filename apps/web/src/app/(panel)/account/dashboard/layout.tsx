import Header from '@/components/site/panel/dashboard/layouts/Header';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="py-4 space-y-10">{children}</main>
    </>
  );
};

export default RootLayout;
