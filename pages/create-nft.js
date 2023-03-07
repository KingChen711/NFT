import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import images from "../assets";
import { useTheme } from "next-themes";
import { Button } from "../components";

function CreateNft() {
  const { theme } = useTheme();
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(() => {
    // upload image to the ipfs
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () =>
      `
    dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive && " border-file-active"}
    ${isDragAccept && " border-file-accept"}
    ${isDragReject && " border-file-reject"}
    `,
    []
  );

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <div className="font-semibold text-3xl dark:text-white text-nft-black-1 font-poppins">
          Create new NFT
        </div>
        <div className="mt-16">
          <p className="dark:text-white text-nft-black-1 text-xl font-semibold font-poppins">
            Upload File
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="dark:text-white text-nft-black-1 text-xl font-semibold font-poppins">
                  JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb
                </p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    alt="file_upload"
                    className={theme === "light" && "invert filter"}
                  />
                </div>

                <p className="dark:text-white text-nft-black-1 text-xl font-semibold font-poppins">
                  Drag and Drop File
                </p>
                <p className="dark:text-white text-nft-black-1 text-xl font-semibold font-poppins">
                  or Browse media on your device
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNft;