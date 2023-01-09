import { Skeleton } from "antd";
import Blockies from "react-blockies";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

interface IBlockie {
  currentWallet?: boolean;
  address?: string;
  scale?: number;
  style?: boolean;
  avatar?: boolean;
  size?: number;
}

function Blockie(props: IBlockie) {
  // todo: set authentication state variables
  //if (!props.address && (!account || !isAuthenticated))
  //  return <Skeleton.Avatar active size={40} />;

  //const generateSeed = () => {
  //  if (props.currentWallet && account) {
  //    return account.toLowerCase();
  //  } else {
  //    props.address?.toLowerCase();
  //  }
  //};
  //return (
  //  <Blockies seed={generateSeed() || ""} className="identicon" {...props} />
  //);
}

export default Blockie;
