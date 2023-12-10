"use client";

import React from "react";
import { useRouter } from "next/router";
import lighthouse from "@lighthouse-web3/sdk";
import { ethers } from "ethers";

function ViewFile() {
  const router = useRouter();
  const { id } = router.query;
  const [fileURL, setFileURL] = React.useState(null);

  const encryptionSignature = async () => {
    // @ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer);
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  /* Decrypt file */
  const decrypt = async () => {
    // Fetch file encryption key
    const cid = id; //replace with your IPFS CID
    const { publicKey, signedMessage } = await encryptionSignature();
    /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of the file to decrypt
          publicKey: public key of the user who has access to file or owner
          signedMessage: message signed by the owner of publicKey
    */
    //@ts-ignore
    const keyObject = await lighthouse.fetchEncryptionKey(cid, publicKey, signedMessage);

    // Decrypt file
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of the file to decrypt
          key: the key to decrypt the file
          mimeType: default null, mime type of file
    */

    const fileType = "image/jpeg";
    //@ts-ignore
    const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType);
    console.log(decrypted);
    /*
      Response: blob
    */

    // View File
    const url = URL.createObjectURL(decrypted);
    console.log(url);
    //@ts-ignore
    setFileURL(url);
  };
  const handleRenderBlobUrl = (blob: any) => {
    if (fileURL) {
      return <img src={blob} alt="" />;
    }
    return <div> File Format is not supported yet!</div>;
  };

  return (
    <div className="App">
      <button onClick={() => decrypt()}>decrypt</button>
      <h1>Route Parameter: {id}</h1>

      {fileURL ? (
        <a href={fileURL} target="_blank" rel="noreferrer">
          viewFile
        </a>
      ) : null}
      {fileURL ? handleRenderBlobUrl(fileURL) : null}
    </div>
  );
}

export default ViewFile;
