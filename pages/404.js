import React from 'react';
import Link from 'next/link';
import SEO from '~/components/SEO';
import { pageNotFound } from '~/constants/seoData';

const PageNotFound = () => {
  return (
    <>
      <SEO {...{ ...pageNotFound }} />
      <div className="justify-centers absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <h1 className="px-4 text-xl font-semibold">
          Error 404: We're as shocked as you are! Let's navigate back to movie
          magic together.
        </h1>
        <Link
          className="mt-4 rounded-full bg-green px-6 py-2 text-white opacity-85 hover:opacity-100"
          href="/"
          as="/"
        >
          Go Back
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
