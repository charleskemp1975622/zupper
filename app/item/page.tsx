"use client";

import { NftAttributeDisplayType } from "@lens-protocol/react-web";
import { FormEvent, useState } from "react";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";
import { upload } from "../../lib/upload";
import { getWalletClient } from "../../lib/state";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const handleCreateItem = async (event: FormEvent) => {
    console.log("test");
    event.preventDefault();

    const attributes = [
      {
        traitType: "Name",
        value: formData.name,
        displayType: NftAttributeDisplayType.String.toLowerCase(),
      },
      {
        traitType: "Category",
        value: formData.category,
        displayType: NftAttributeDisplayType.String.toLowerCase(),
      },
    ];
    const postData = {
      version: "2.0.0",
      metadata_id: uuidv4(),
      content: formData.name,
      locale: "en",
      mainContentFocus: "TEXT_ONLY",
      attributes,
      description: formData.name,
      name: formData.name,
    };
    const url = await upload(postData, getWalletClient());

    console.log(getWalletClient());
    return;

    // const { connector } = await connectAsync();
    // if (connector instanceof InjectedConnector) {
    //   const signer = await connector.getSigner();

    //   const typedResult = await mutate({
    //     mutation: gql(createPostQuery),
    //     variables: {
    //       profileId: activeProfile.id,
    //       url,
    //     },
    //   });

    //   // @ts-ignore
    //   const typedData = typedResult.data.createPostTypedData.typedData;
    //   const lensHub = new ethers.Contract(LensHubContract, LensHubAbi, signer);
    //   const signature = await await signer._signTypedData(
    //     omit(typedData.domain, "__typename"),
    //     omit(typedData.types, "__typename"),
    //     omit(typedData.value, "__typename")
    //   );
    //   const { v, r, s } = splitSignature(signature);

    //   const result = await lensHub.postWithSig({
    //     profileId: typedData.value.profileId,
    //     contentURI: typedData.value.contentURI,
    //     collectModule: typedData.value.collectModule,
    //     collectModuleInitData: typedData.value.collectModuleInitData,
    //     referenceModule: typedData.value.referenceModule,
    //     referenceModuleInitData: typedData.value.referenceModuleInitData,
    //     sig: {
    //       v,
    //       r,
    //       s,
    //       deadline: typedData.value.deadline,
    //     },
    //   });
    //   showNotification(
    //     "Post submitted",
    //     "Please click here and wait for the transaction to complete and refresh the page after a few seconds",
    //     result.hash
    //   );
    // }
  };

  const handleFormChange = () => {};

  return (
    <div className="mt-36 grid justify-center gap-48 text-center">
      <form className="space-y-7" onSubmit={handleCreateItem}>
        <div className="space-y-4">
          <div>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full rounded-md p-2 text-sm ring-1 ring-inset ring-gray-300"
              />
            </div>
          </div>
          <div>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                placeholder="Price"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleFormChange}
                className="w-full rounded-md p-2 text-sm ring-1 ring-inset ring-gray-300"
              />
            </div>
          </div>
          <div>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                placeholder="Category"
                name="category"
                id="category"
                onChange={handleFormChange}
                className="w-full rounded-md p-2 text-sm ring-1 ring-inset ring-gray-300"
              />
            </div>
          </div>
          <div>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="file"
                name="image"
                id="image"
                value={formData.image}
                onChange={handleFormChange}
                className="w-full rounded-md p-2 text-sm ring-1 ring-inset ring-gray-300"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn-primary btn whitespace-nowrap normal-case text-lg w-32"
        >
          Add item
        </button>
      </form>
    </div>
  );
}
