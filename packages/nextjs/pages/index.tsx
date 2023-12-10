"use client";

import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { FileUpload } from "~~/components/fileUpload";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex  flex-row w-full justify-between flex-grow pt-10 px-4">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">
              Welcome to
              <span className="block text-4xl font-bold">Block Share</span>
            </span>
          </h1>
          <FileUpload />
        </div>
        <div className="flex w-full pt-10 px-4">
          {true ? (
            <div>
              {" "}
              <h1 className="text-center mb-8"> </h1>{" "}
            </div>
          ) : (
            <div className="border-dashed border-secondary p-4 flex  flex-row w-full justify-between flex-grow">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text text-4xl">
                Start uploading to see the magic
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
