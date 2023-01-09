import { useCallback, useEffect, useRef, useState, Ref } from "react";
import { getEllipsisTxt } from "../helpers/formatters";
import Blockie from "./Blockie";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledInput = styled(Input)`
  border: 0.125rem solid #3e389f;
  border-radius: 0.9375rem;
`;

function AddressInput(props: any) {
  // const input = useRef<HTMLInputElement>();
  const input = useRef<any>(null);
  // const input = useRef() as MutableRefObject<HTMLInputElement>;
  const [address, setAddress] = useState("");
  const [validatedAddress, setValidatedAddress] = useState("");
  const [isDomain, setIsDomain] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (validatedAddress) props.onChange(isDomain ? validatedAddress : address);
  }, [props, validatedAddress, isDomain, address]);

  //const updateAddress = useCallback(
  //  async (value: string) => {
  //    setAddress(value);
  //    if (isSupportedDomain(value)) {
  //      const processPromise = function (promise: any) {
  //        promise
  //          .then((addr: string) => {
  //            setValidatedAddress(addr);
  //            setIsDomain(true);
  //          })
  //          .catch(() => {
  //            setValidatedAddress("");
  //          });
  //      };
  //      if (value.endsWith(".eth")) {
  //        processPromise(web3Provider?.eth?.ens?.getAddress(value));
  //      } else {
  //        processPromise(
  //          resolveDomain({
  //           domain: value,
  //          }).then((r) => r?.address),
  //        );
  //      }
  //   } else if (value.length === 42) {
  //      setValidatedAddress(getEllipsisTxt(value, 10));
  //      setIsDomain(false);
  //    } else {
  //      setValidatedAddress("");
  //     setIsDomain(false);
  //    }
  //  },
  //  [resolveDomain, web3Provider?.eth?.ens],
  //);

  const Cross = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#E33132"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={() => {
        setValidatedAddress("");
        setIsDomain(false);
        setTimeout(function () {
          input?.current?.focus();
        });
      }}
      style={{ cursor: "pointer" }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  return (
    <StyledInput
      ref={input}
      size="large"
      placeholder={props.placeholder ? props.placeholder : "Public address"}
      prefix={
        isDomain || address.length === 42 ? (
          <Blockie
            address={(isDomain ? validatedAddress : address).toLowerCase()}
            size={8}
            scale={3}
          />
        ) : (
          <SearchOutlined />
        )
      }
      suffix={validatedAddress && <Cross />}
      autoFocus={props.autoFocus}
      value={
        isDomain
          ? `${address} (${getEllipsisTxt(validatedAddress)})`
          : validatedAddress || address
      }
      //onChange={(e) => {
      //  updateAddress(e.target.value);
      //}}
      disabled={!!validatedAddress}
      style={
        validatedAddress
          ? { ...props?.style, border: "0.0625rem solid rgb(33, 191, 150)" }
          : { ...props?.style }
      }
    />
  );
}

function isSupportedDomain(domain: string) {
  return [
    ".eth",
    ".crypto",
    ".coin",
    ".wallet",
    ".bitcoin",
    ".x",
    ".888",
    ".nft",
    ".dao",
    ".blockchain",
  ].some((tld) => domain.endsWith(tld));
}

export default AddressInput;
