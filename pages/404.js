import React from "react";
import Link from "next/link";
import SEO from "~/components/SEO";
import { pageNotFound } from "~/constants/seoData";

const PageNotFound = () => {
  return (
    <>
      <SEO {...{ ...pageNotFound }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-centers">
        <h1 className=" text-xl font-semibold px-4">
          Error 404: We're as shocked as you are! Let's navigate back to movie
          magic together.
        </h1>
        <Link
          className=" bg-green text-white px-6 py-2 mt-4 rounded-full opacity-85 hover:opacity-100"
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
