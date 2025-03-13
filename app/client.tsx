"use client";

import { LensProvider } from "@lens-protocol/react-web";
import { ToastContainer } from "react-toastify";

import { lensConfig } from "@/lib/lens-config";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

const chains = [polygonMumbai];
const projectId = process.env.NEXT_PUBLIC_NETWORKWALLETCONNECT_PROJECTID || "";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export function Client({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <WagmiConfig config={wagmiConfig}>
        <LensProvider config={lensConfig}>
          <div>{children}</div>
        </LensProvider>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <ToastContainer theme="light" />
    </div>
  );
}
