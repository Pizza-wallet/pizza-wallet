interface RpcInterface {
  1?: string;
  137?: string;
}
const rpcProviders: RpcInterface = {
  1: process.env.REACT_APP_RPC_PROVIDER_ETH,
  137: process.env.REACT_APP_RPC_PROVIDER_POLYGON,
};
export const getRpcProvider = (chainId: any) => {
  return rpcProviders[chainId as keyof RpcInterface];
};
