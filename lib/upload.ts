// @ts-nocheck
import { WebBundlr } from "@bundlr-network/client";
import { fetchSigner } from "wagmi/actions";

import * as React from "react";
import { type WalletClient, useWalletClient } from "wagmi";
import { providers } from "ethers";

export function walletClientToSigner(walletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

const TOP_UP = "200000000000000000"; // 0.2 MATIC
const MIN_FUNDS = 0.05;

export const upload = async (data: any, client) => {
  // const signer = await fetchSigner();
  const signer = walletClientToSigner(client);
  const provider = signer?.provider;
  // use method injection to add the missing function
  provider.getSigner = () => signer;

  // create a WebBundlr object
  const bundlrNode = "https://devnet.bundlr.network";
  const bundlr = new WebBundlr(bundlrNode, "matic", signer?.provider);

  await bundlr.ready();

  console.log(bundlr);

  const address = await client?.getAddress();
  let url = "";
  if (address) {
    const balance = await bundlr.getBalance(address);

    if (bundlr.utils.unitConverter(balance).toNumber() < MIN_FUNDS) {
      await bundlr.fund(TOP_UP);
    }

    const serialized = JSON.stringify(data);
    console.log("test1");
    const tx = await bundlr.upload(serialized, {
      tags: [{ name: "Content-Type", value: "application/json" }],
    });
    console.log("test2");

    url = `https://arweave.net/${tx.id}`;
    console.log(`Upload success content URI=${url}`);
  }
  return url;
};
