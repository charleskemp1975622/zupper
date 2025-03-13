import { apolloClient } from "./apollo-client";
// import { getAddressFromSigner, signText } from '../ethers.service';
import {
  getAuthenticationToken,
  setAuthenticationToken,
  setWalletClient,
} from "./state";
import { gql } from "@apollo/client";

export const generateChallenge = async (request: any) => {
  console.log("Querying...");
  const result = await apolloClient.query({
    query: gql(challengeQuery),
    variables: {
      request,
    },
  });

  return result.data.challenge;
};

const authenticate = async (request: any) => {
  const result = await apolloClient.mutate({
    mutation: gql(authenticateQuery),
    variables: {
      request,
    },
  });

  return result.data!.authenticate;
};

export const login = async (address: any, walletClient: any) => {
  if (getAuthenticationToken()) {
    console.log("login: already logged in");
    return;
  }

  console.log("login: address", address);

  // we request a challenge from the server
  const challengeResponse = await generateChallenge({ address });
  console.log("walletclient:", walletClient);

  // sign the text with the wallet
  console.log(challengeResponse.text);
  const signature = await walletClient.signMessage({
    message: challengeResponse.text,
  });
  console.log("done!");

  const authenticatedResult = await authenticate({ address, signature });
  console.log("login: result", authenticatedResult);
  setAuthenticationToken(authenticatedResult.accessToken);
  setWalletClient(walletClient);

  return authenticatedResult;
};

export const challengeQuery = `query Challenge($request: ChallengeRequest!) {
  challenge(request: $request) {
    text
  }
}`;

export const authenticateQuery = `mutation authenticate($request: SignedAuthChallenge!) {
  authenticate(request: $request) {
    accessToken
    refreshToken
  }
}`;
