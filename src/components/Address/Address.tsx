import { useState } from "react";
import { getEllipsisTxt } from "../../helpers/formatters";
import Blockie from "../Blockie";
import "./identicon.css";
import { useMoralis } from "react-moralis";
import { Skeleton } from "antd";
import { CustomImg } from "../reusable/CustomImg";
import Copy from "./assets/copy.svg";
import Eye from "./assets/eye.svg";
import EyeHidden from "./assets/eyeHidden.svg";
import styled from "styled-components";

const StyledAddressP = styled(`p`)`
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin: auto;
  text-align: center;
  letter-spacing: 0.04em;
  width: 50%;
  color: rgba(0, 0, 0, 0.6);
`;

const styles = {
  address: {
    height: "2.25rem",
    display: "flex",
    padding: "0.5rem",
    gap: "0.3125rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "0.5625rem",
    alignItems: "center",

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
  const { account, isAuthenticated } = useMoralis();
  // const [address, setAddress] = useState<any>();
  const [isClicked, setIsClicked] = useState(false);
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false);

  // useEffect(() => {
  //   setAddress(props?.address || (isAuthenticated && account));
  // }, [account, isAuthenticated, props]);

  const address = process.env.REACT_APP_TEST_ACCOUNT;

  if (!address)
    return (
      <Skeleton paragraph={{ rows: 1, width: "100%" }} title={false} active />
    );

  return (
    <div>
      <div style={{ ...styles.address, ...props.style }}>
        {props.avatar === "left" && (
          <Blockie address={address} size={20} scale={3} />
        )}

        <div>
          <div style={{ display: "flex" }}>
            <p>{props.size ? getEllipsisTxt(address, props.size) : address}</p>
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
            <p>Private key</p>
            {isPrivateKeyVisible ? (
              <CustomImg
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsPrivateKeyVisible(false);
                }}
                src={Eye}
              />
            ) : (
              <CustomImg
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsPrivateKeyVisible(true);
                }}
                src={EyeHidden}
              />
            )}
          </div>
        </div>
      </div>
      {/* Hardcoded the below for now */}
      {isPrivateKeyVisible && (
        <StyledAddressP>
          afdfd9c3d2095ef696594f6cedca3f5e72dcd697e2a7521b1578140422a4f890
        </StyledAddressP>
      )}
    </div>
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
