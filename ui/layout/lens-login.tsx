import {
  useActiveProfile,
  useActiveWallet,
  useWalletLogin,
  useWalletLogout,
} from "@lens-protocol/react-web";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useWalletClient } from "wagmi";
import { polygonMumbai } from "@wagmi/core/chains";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";

import { useRouter } from "next/navigation";

import { getPictureURL } from "@/lib/get-picture-url";
import { truncateAddr } from "@/lib/truncate-address";

import { LensProfiles } from "./lens-profiles";

import { Web3Button, useWeb3Modal } from "@web3modal/react";

import { login } from "@/lib/lens-api";

export function LensLogin() {
  const { open, close } = useWeb3Modal();
  const {
    execute,
    error: loginError,
    isPending: isLoginPending,
  } = useWalletLogin();
  const { execute: logout } = useWalletLogout();
  const { data: wallet } = useActiveWallet();
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { connectAsync } = useConnect({
    connector: new WalletConnectConnector({
      chains: [polygonMumbai],
      options: {
        projectId: process.env
          .NEXT_PUBLIC_NETWORKWALLETCONNECT_PROJECTID as string,
      },
    }),
  });
  const { disconnectAsync } = useDisconnect();
  const { data: activeProfile } = useActiveProfile();
  const { push } = useRouter();

  useEffect(() => {
    loginError && toast.error(loginError.message);
  }, [loginError]);

  useEffect(() => {
    if (isConnected && walletClient && address) {
      console.log("connected");
      // console.log(walletClient.signMesage("test"));
      login(address, walletClient).then(() => {
        push("/item");
      });
    } else {
      console.log("disconnected");
    }
  }, [isConnected, address, walletClient]);

  return (
    <>
      {wallet ? (
        activeProfile ? (
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn-primary btn-sm btn flex flex-nowrap normal-case"
            >
              <div className="relative h-5 w-5">
                <Image
                  src={getPictureURL(activeProfile)}
                  alt={activeProfile.handle}
                  fill
                  sizes="(max-width: 20px) 100vw"
                  className="rounded-full object-cover"
                />
              </div>
              {activeProfile?.handle}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
            >
              <LensProfiles />
              <li>
                <a onClick={logout}>Log out</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn-primary btn-sm btn flex flex-nowrap whitespace-nowrap normal-case"
            >
              {truncateAddr(wallet.address)}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
            >
              <LensProfiles />
              <li>
                <a onClick={logout}>Log out</a>
              </li>
            </ul>
          </div>
        )
      ) : (
        <>
          <button
            className="btn-primary btn whitespace-nowrap normal-case text-lg w-32"
            disabled={isLoginPending}
            onClick={() => open()}
          >
            Owner
          </button>
        </>
      )}
    </>
  );
}
