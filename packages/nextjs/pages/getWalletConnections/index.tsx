"use client";

import type { NextPage } from "next";
import { useContractRead, useWalletClient } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { getParsedError } from "~~/components/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const Home: NextPage = () => {
  const { data: walletClient } = useWalletClient();
  console.log("address", walletClient);
  const { data: deployedContractData } = useDeployedContractInfo("YourContract");
  const { refetch } = useContractRead({
    address: deployedContractData?.address,
    functionName: "getConnections",
    abi: deployedContractData?.abi,
    //@ts-ignore
    args: [walletClient?.account?.address],
    enabled: false,
    onError: (error: any) => {
      const parsedErrror = getParsedError(error);
      notification.error(parsedErrror);
    },
  });

  const handleSmartContract = async () => {
    const { data } = await refetch();
    console.log({ data });
  };

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <button onClick={handleSmartContract}>Test</button>
      </div>
    </>
  );
};

export default Home;
