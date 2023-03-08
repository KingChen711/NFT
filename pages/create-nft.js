import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import images from "../assets";
import { useTheme } from "next-themes";
import { Button } from "../components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function CreateNft() {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(() => {
    // upload image to the ipfs
  }, []);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <div className="font-semibold text-3xl dark:text-white text-nft-black-1 font-poppins">
          Create new NFT
        </div>
        <div className="mt-16">
          <ImageField fileUrl={fileUrl} onDrop={onDrop} />
          <FormNFT />
        </div>
      </div>
    </div>
  );
}

export default CreateNft;

function FormNFT() {
  const initialValues = {
    name: "",
    description: "",
    price: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
  });
  const onSubmit = (value) => {
    console.log(value);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="flex items-center mb-5">
          <div className="dark:text-white text-nft-black-1 text-xl font-semibold font-poppins">
            Name
          </div>
          <div className="text-red-500 ml-3">
            <ErrorMessage name="name" />
          </div>
        </div>
        <Field
          name="name"
          type="text"
          placeholder="Item Name"
          className="py-4 px-7 rounded-lg w-full dark:bg-nft-black-1 dark:border-none outline-none border border-nft-gray-1"
        />

        <div className="flex items-center mb-5 mt-14">
          <div className="dark:text-white text-nft-black-1 text-xl font-semibold font-poppins">
            Description
          </div>
          <div className="text-red-500 ml-3">
            <ErrorMessage name="description" />
          </div>
        </div>
        <Field
          component="textarea"
          name="description"
          rows={5}
          placeholder="Description of your item"
          className="py-4 px-7 rounded-lg w-full dark:bg-nft-black-1 dark:border-none outline-none border border-nft-gray-1"
        />
        <div className="flex items-center mb-5 mt-14">
          <div className="dark:text-white text-nft-black-1 text-xl font-semibold font-poppins">
            Price
          </div>
          <div className="text-red-500 ml-3">
            <ErrorMessage name="price" />
          </div>
        </div>
        <div className="flex items-center dark:bg-nft-black-1 rounded-lg pr-7 border border-nft-gray-1 dark:border-none mb-14">
          <Field
            type="number"
            name="price"
            placeholder="Enter price"
            className="w-0 flex-1 bg-inherit dark:border-none outline-none py-4 px-7"
          />
          <div>ETH</div>
        </div>
        <Button type="submit" variant="contained" className="float-right">
          Create Item
        </Button>
      </Form>
    </Formik>
  );
}

function ImageField({ fileUrl, onDrop }) {
  const { theme } = useTheme();
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
    <>
      <p className="dark:text-white text-nft-black-1 text-xl font-semibold font-poppins">
        Upload File
      </p>
      <div className="mt-4 mb-14">
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
    </>
  );
}
