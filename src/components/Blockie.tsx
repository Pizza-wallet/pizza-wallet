import { Skeleton } from "antd";
import Blockies from "react-blockies";
import { useMoralis } from "react-moralis";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

interface IBlockie {
  currentWallet: boolean;
  address?: string;
  scale: number;
  style: boolean;
  avatar: boolean;
}

function Blockie(props: IBlockie) {
  const { account, isAuthenticated } = useMoralis();
  if (!props.address && (!account || !isAuthenticated))
    return <Skeleton.Avatar active size={40} />;

  const generateSeed = () => {
    if (props.currentWallet && account) {
      return account.toLowerCase();
    } else {
      props.address?.toLowerCase();
    }
  };
  return (
    <Blockies seed={generateSeed() || ""} className="identicon" {...props} />
  );
}

export default Blockie;
