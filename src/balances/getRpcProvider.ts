interface RpcInterface {
  1?: string;
  137?: string;
  56?: string;
  42161?: string;
}
const rpcProviders: RpcInterface = {
  1: process.env.REACT_APP_RPC_PROVIDER_ETH,
  137: process.env.REACT_APP_RPC_PROVIDER_POLYGON,
  56: process.env.REACT_APP_RPC_PROVIDER_BSC,
  42161: process.env.REACT_APP_RPC_PROVIDER_ARBITRUM,
};
export const getRpcProvider = (chainId: any) => {
  return rpcProviders[chainId as keyof RpcInterface];
};
