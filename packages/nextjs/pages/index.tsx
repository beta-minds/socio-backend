"use client";

import { JSXElementConstructor, Key, ReactElement, ReactNode } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { FileUpload } from "~~/components/fileUpload";
import { useLocalStorage } from "~~/hooks/useLocalStorage";

const Home: NextPage = () => {
  //@ts-ignore
  const [cids] = useLocalStorage("cids", []);
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
          {cids?.length ? (
            <div className="flex flex-wrap gap-2 max-w-6xl ml-16">
              {cids.map(
                (ids: {
                  cid: Key | null | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined;
                }) => (
                  <div key={ids.cid}>
                    <Link href={`/viewFile/${ids.cid}?file=${ids.name}`}>
                      <div className="card w-150 min-w-64 bg-base-100 shadow-xl cursor-pointer">
                        <div className="card-body">
                          <div className="flex items-center">
                            <div className="mr-4">
                              <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8AAACjo6ORkZGIiIioqKjb29szMzO4uLhBQUHV1dU+Pj719fXr6+tpaWnv7+9vb2/Dw8OXl5dxcXHPz88nJycfHx/k5OQMDAxWVlaurq7f398pKSlaWlqCgoI6Ojp7e3sXFxdjY2Nxa/wIAAADfklEQVR4nO3d2XLiMBSEYTnsxCEZICxmZlje/yEDqTCV8kJK6JxuFdP/ZS5S+kpgMLasEJRSSimllFJKqYjK3dSi4ZoNaW/d/12YtdnOl2xQvYUd79oiJ+Ta3ndp9cSGXdv5AC/12LbPSj/guRzmcesqLEb0Y+vSF3iuIgv/uAuLv1yhP/D8ycEE+r9I2cQKIizeeMIBRkicxSeQkDeLMCGNiBOyiHXh++Q5qf0NIue9WBfOE//fzW+5lFmsC1PPBl6ye6FihQwiWEggooV4IlwIJ+KFaCJBCCYyhFgiRQglegs3761E4Bc49zns+JkEN4v+wlcy0V/IJgKEZCJCyCVChFQiRsgkgoREIkrII8KENCJOyCIChSQiUsghQoUUIlbIIIKFBCJaiCfChXAiXogmEoRgIkOIJVKEUCJHiCSShEAiS4gj0oRdxFniABrxhKhZJApBRKYQQ6QKIUSuEEEkCwFEttCfSBd2Ec1uf+cLu4hWixgyEHYRjZai5CAM5apNuE8cylecu01qbY6tfx48jrCrxxeaLO7LWmgyidbCjuPinVm8E62FtivFVjkKj6ZEg+XS5kLbZeGHDIW/TIUGxxpzYWi/3fLephkKbddspq7h8RCGvqXwlKMwzCyJWQpNZ7HMUhiWdk9KeUkdi4/wbDwYHVN3qSPxEl4q7yiMagMapo7CU3hXEkYnITwJo5MQnoTRSQhPwugkhCdhdBKGMHybuNVv/kaBF44L1xo/UuCFvsBiSxe6P5OPLjS+DCGhhBJKKKGEEmYpdHoi/b+OdGE4+Qob98kSzp5Mr1nXaz6UnnEGXA7dahmQzvGjkxCehNFJCE/C6CSEJ2F0EsKTMDoJ4RGEr/OZV4uWlbB44bTwbNW4RPpw1w8bjzLR9UNz4eP/XiqhhBJKKKGEErpu+JyJMEx8gY11vnhh+ewJPDQGxDgDno7dalkgqnP86CSEJ2F0EsKTMDoJ4UkYnYTwJIxOQngSRichPAmjkxCehNFJCE/C6CSEJ2F0EsJzF6Y/mTgxd+GpGlCr6pt5mAuzS0IJ/wNhxRb8VPKeSO73PKWW/MRy231h7DPYpcR2swbz+unCAdtwO4utyTZsxK1MdpZ1X1GRUvJx5rM5m9Fd+h4smRMN9kL6Ks8PxX3y1hbfy28aR2NL36Vh1etnU29stIGlUkoppZRSSqlrH3pLaU4V8W0dAAAAAElFTkSuQmCC"
                                alt="file"
                                className="w-16 h-16 rounded-full"
                              />
                            </div>
                            <div>
                              <h2 className="card-title">{ids.name}</h2>
                              <p className="text-sm text-neutral-500"> {ids.name}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-neutral-500"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="text-sm text-neutral-500 ml-1">View / Download</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ),
              )}
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
