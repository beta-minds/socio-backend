import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { FileUpload } from "~~/components/fileUpload";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex flex-col items-center justify-center flex-grow w-full max-w-2xl px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold leading-tight text-gray-900">
            <span className="text-blue-600">Next.js</span> + <span className="text-red-600">Tailwind CSS</span> +{" "}
            <span className="text-yellow-600">TypeScript</span>
          </h1>
          <FileUpload />
        </div>
      </div>
    </>
  );
};

export default Home;
