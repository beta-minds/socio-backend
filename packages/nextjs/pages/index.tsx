"use client";

import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { FileUpload } from "~~/components/fileUpload";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Block Share</span>
          </h1>
          <FileUpload />
        </div>
      </div>
    </>
  );
};

export default Home;
