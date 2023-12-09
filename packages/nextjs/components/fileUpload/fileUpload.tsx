"use client";

import React, { useCallback, useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";

function FileUpload() {
  const [loading, setloading] = useState(false);
  const [steps, setSteps] = useState(1);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [selectedShareWithFile, setSelectedShareWithFile] = useState([]);
  const [shareWith, setShareWith] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const isShareModalDisabled = selectedShareWithFile.length > 0;
  const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;
  console.log(apiKey);

  const progressCallback = useCallback((data: any) => {
    setProgress(data.progress);
  }, []);

  const handleShareWith = () => {
    if (selectedShareWithFile.length > 0) {
      // change this
      setSelectedShareWithFile([]);
    }
  };

  const handleIsPublicChange = () => {
    setIsPublic(!isPublic);
  };

  const handleSearchChange = (e: any) => {
    setSearchName(e.target.value);
    //TODO: change this logic
    if (e.target.value.length > 0) {
      // change this
      setShareWith([]);
    } else {
      setShareWith([]);
    }
  };

  const handleModalCancel = () => {
    const modalElement = document.getElementById("file_upload");
    //@ts-ignore
    modalElement.style.display = "none";
  };

  const handleShowModal = () => {
    //@ts-ignore
    document.getElementById("file_upload").showModal();
  };

  // Function to sign the authentication message using Wallet
  const signAuthMessage = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          throw new Error("No accounts returned from Wallet.");
        }
        const signerAddress = accounts[0];
        const { message } = (await lighthouse.getAuthMessage(signerAddress)).data;
        // @ts-ignore
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, signerAddress],
        });
        return { signature, signerAddress };
      } catch (error) {
        console.error("Error signing message with Wallet", error);
        return null;
      }
    } else {
      console.log("Please install Wallet!");
      return null;
    }
  };

  // Function to upload the encrypted file
  const uploadEncryptedFile = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }
    setloading(true);
    try {
      // This signature is used for authentication with encryption nodes
      // If you want to avoid signatures on every upload refer to JWT part of encryption authentication section
      const encryptionAuth = await signAuthMessage();
      if (!encryptionAuth) {
        console.error("Failed to sign the message.");
        return;
      }

      const { signature, signerAddress } = encryptionAuth;

      // Upload file with encryption
      // @ts-ignore
      const output = await lighthouse.uploadEncrypted(file, apiKey, signerAddress, signature, progressCallback);
      console.log("Encrypted File Status:", output);
      /* Sample Response
        {
          data: [
            Hash: "QmbMkjvpG4LjE5obPCcE6p79tqnfy6bzgYLBoeWx5PAcso",
            Name: "izanami.jpeg",
            Size: "174111"
          ]
        }
      */
      // If successful, log the URL for accessing the file
      setloading(false);
      setSteps(2);

      console.log(`Decrypt at https://decrypt.mesh3.network/evm/${output.data[0].Hash}`);
    } catch (error) {
      console.error("Error uploading encrypted file:", error);
    }
  };

  // Function to handle file selection
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const step1 = () => {
    return (
      <div className="mt-4 flex flex-col items-center">
        {" "}
        <input type="file" className="file-input w-full max-w-xs" onChange={handleFileChange} />
        <div className="mb-8">
          {loading ? (
            <progress className="progress progress-primary w-56" value={progress} max="100"></progress>
          ) : (
            <button onClick={uploadEncryptedFile} className="file-input w-full max-w-xs mt-8 ml-2 " disabled={!file}>
              Upload Encrypted File
            </button>
          )}
        </div>
      </div>
    );
  };

  const step2 = () => {
    return (
      <div className="mt-4  flex flex-col items-center">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg mt-8">Share your Files</h3>
        <p className="py-4">Select the list of persons you want to share file with</p>
        <div className="m-2  flex flex-row items-center">
          <input type="checkbox" className="toggle toggle-md" checked={isPublic} onChange={handleIsPublicChange} />
          <span className="ml-2">Make your file {isPublic ? "Private" : "Public"}</span>
        </div>
        <input
          type="text"
          placeholder="Search Name"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={handleSearchChange}
          value={searchName}
        />
        {shareWith.map((item, index) => {
          return (
            <div className="flex flex-row justify-between items-center mt-4" key={index}>
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary"
                  checked={selectedShareWithFile.includes(item)}
                  onChange={() => {
                    if (selectedShareWithFile.includes(item)) {
                      setSelectedShareWithFile(selectedShareWithFile.filter(i => i !== item));
                    } else {
                      setSelectedShareWithFile([...selectedShareWithFile, item]);
                    }
                  }}
                />
                <span className="ml-2">{item}</span>
              </div>
              <button className="btn btn-ghost btn-sm">View</button>
            </div>
          );
        })}
        <div className="flex flex-row justify-between mt-4">
          <button className="btn btn-primary" disabled={isShareModalDisabled} onClick={handleShareWith}>
            Share
          </button>
          <button className="btn btn-ghost" onClick={handleModalCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <dialog id="file_upload" className="modal modal-lg modal-active">
        <div className="modal-box">
          <div className="mt-4 flex flex-col items-center">
            <ul className="steps ">
              <li className={`step ${steps >= 1 ? "step-primary" : "step-secondary"}`}>Select File</li>
              <li className={`step ${steps === 2 ? "step-primary" : "step-secondary"}`}>Select Sharing</li>
            </ul>
          </div>
          {steps === 1 ? step1() : step2()}
          {steps === 1 && (
            <button className="btn btn-ghost flex flex-col items-center" onClick={handleModalCancel}>
              Cancel
            </button>
          )}{" "}
        </div>
      </dialog>
      <button className="btn btn-primary flex flex-col items-center" onClick={handleShowModal}>
        Upload File
      </button>
    </div>
  );
}

export default FileUpload;
