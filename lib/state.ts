let authenticationToken: string | null = null;
let walletClient: any;

export let setAuthenticationToken = (token: string) => {
  authenticationToken = token;
  console.log("setAuthenticationToken: token", token);
};

export let getAuthenticationToken = () => {
  return authenticationToken;
};

export let setWalletClient = (_walletClient: any) => {
  walletClient = _walletClient;
};

export let getWalletClient = () => {
  return walletClient;
};
