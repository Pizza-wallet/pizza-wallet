import { useState } from "react";
import { getEllipsisTxt } from "../../helpers/formatters";
import Blockie from "../Blockie";
import "./identicon.css";
import { Skeleton } from "antd";
import { CustomImg } from "../reusable/CustomImg";
import Copy from "./assets/copy.svg";
import Eye from "./assets/eye.svg";
import EyeHidden from "./assets/eyeHidden.svg";
import styled from "styled-components";
import PizzaWalletWarning from "../reusable/PizzaWalletWarning";
import useENSName from "../../hooks/useENS";

const StyledAddressP = styled(`p`)`
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin: 15px auto 0 auto;
  text-align: center;
  letter-spacing: 0.04em;
  width: 16.9375rem;
  color: rgba(0, 0, 0, 0.6);
`;

const StyledAddress = styled(`div`)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0.5rem;
  gap: 0.3125rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.5625rem;

  font-family: Rubik;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 28px;
  letter-spacing: 0.04em;
`;

const styles = {
  address: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "0.5rem",
    gap: "0.3125rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "0.5625rem",

    fontFamily: "Rubik",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.04em",
  },
};

interface IAddressProps {
  address?: string;
  avatar?: string;
  size?: number;
  copyable: boolean;
  style?: {};
}

function Address(props: IAddressProps) {
  // const [address, setAddress] = useState<any>();
  const [isClicked, setIsClicked] = useState(false);
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);

  // useEffect(() => {
  //   setAddress(props?.address || (isAuthenticated && account));
  // }, [account, isAuthenticated, props]);
  // const ensName = process.env.REACT_APP_TEST_ACCOUNT;
  const ensName = "0xE0B2A968Fc566bce543E9da6D3893FfE1170B833";

  const address = useENSName(ensName);

  if (!address)
    return (
      <Skeleton paragraph={{ rows: 1, width: "100%" }} title={false} active />
    );

  return (
    <>
      <StyledAddress>
        {props.avatar === "left" && (
          <Blockie address={address} size={20} scale={3} />
        )}

        <div>
          <div style={{ display: "flex", marginBottom: "5px" }}>
            <p style={{ marginRight: "10px" }}>
              {/* {props.size ? getEllipsisTxt(address, props.size) : address} */}
              {address}
            </p>
            {props.copyable &&
              (isClicked ? (
                <Check />
              ) : (
                <CustomImg
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                    setIsClicked(true);
                  }}
                  src={Copy}
                />
              ))}
          </div>
          <div style={{ display: "flex" }}>
            <p style={{ marginRight: "10px" }}>Private key</p>
            {isPrivateKeyVisible ? (
              <CustomImg
                style={{ cursor: "pointer", marginLeft: "auto" }}
                onClick={() => {
                  setIsPrivateKeyVisible(false);
                }}
                src={Eye}
              />
            ) : (
              <CustomImg
                style={{ cursor: "pointer", marginLeft: "auto" }}
                onClick={() => {
                  setIsPrivateKeyVisible(true);
                }}
                src={EyeHidden}
              />
            )}
          </div>
        </div>
      </StyledAddress>
      {isPrivateKeyVisible && (
        <>
          {/* Hardcoded the below for now */}
          <StyledAddressP>
            afdfd9c3d2095ef696594f6cedca3f5e72dcd697e2a7521b1578140422a4f890
          </StyledAddressP>
          <PizzaWalletWarning
            title={"Warning!"}
            message={
              "Never disclose this key. Anyone with your private key can steal any assets held in your account."
            }
            margin={"20px auto 0 auto"}
          />
        </>
      )}
    </>
  );
}

export default Address;

const Check = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="#21BF96"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l5 5l10 -10" />
    <title id="copied-address">Copied!</title>
  </svg>
);
