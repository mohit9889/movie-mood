import React from 'react';
import Header from './Header';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
});

const MainLayout = ({ children, loading }) => {
  return (
    <div
      className={`bg-primary text-typography ${nunito.variable} min-h-screen w-full font-sans ${
        loading ? 'relative h-screen overflow-hidden' : ''
      }`}
    >
      <div className="mx-auto max-w-4xl p-2 lg:p-6">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
