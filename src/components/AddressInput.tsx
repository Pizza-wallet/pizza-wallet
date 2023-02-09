import { useCallback, useEffect, useRef, useState, Ref } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";
import Blockie from "./Blockie";
import { Input } from "antd";
import styled from "styled-components";
import { PizzaWalletCard } from "./reusable/PizzaWalletCard";
import { Avatar } from "antd";

const StyledInput = styled(Input)`
  box-shadow: none;
  color: #000000;
  font-family: "Rubik", sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: 0.02em;
`;

const Flex = styled("div")`
  display: flex;
  justify-content: start;
`;

const Text = styled("p")`
  color: #000000;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  line-height: 1.5rem;
  letter-spacing: 0.02em;
  margin: 10px 0 0.625rem 10px;
`;

function AddressInput(props: any) {
  // const input = useRef<HTMLInputElement>();
  const input = useRef<any>(null);
  // const input = useRef() as MutableRefObject<HTMLInputElement>;
  const { web3 } = useMoralis();
  const [address, setAddress] = useState("");
  const [validatedAddress, setValidatedAddress] = useState("");
  const [isDomain, setIsDomain] = useState(false);
  const {
    resolve: { resolveDomain },
  } = useMoralisWeb3Api();

  const web3Provider: any = web3;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (validatedAddress) props.onChange(isDomain ? validatedAddress : address);
  }, [props, validatedAddress, isDomain, address]);

  const updateAddress = useCallback(
    async (value: string) => {
      setAddress(value);
      if (isSupportedDomain(value)) {
        const processPromise = function (promise: any) {
          promise
            .then((addr: string) => {
              setValidatedAddress(addr);
              setIsDomain(true);
            })
            .catch(() => {
              setValidatedAddress("");
            });
        };
        if (value.endsWith(".eth")) {
          processPromise(web3Provider?.eth?.ens?.getAddress(value));
        } else {
          processPromise(
            resolveDomain({
              domain: value,
            }).then((r) => r?.address),
          );
        }
      } else if (value.length === 42) {
        setValidatedAddress(getEllipsisTxt(value, 10));
        setIsDomain(false);
      } else {
        setValidatedAddress("");
        setIsDomain(false);
      }
    },
    [resolveDomain, web3Provider?.eth?.ens],
  );

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
    <PizzaWalletCard height={"6.25rem"}>
      <Text>Address</Text>
      <Flex>
        <Avatar
          style={{ marginLeft: "1.5625rem" }}
          src={
            <Blockie
              address={(isDomain
                ? validatedAddress
                : props.receiver
              ).toLowerCase()}
              size={8}
              scale={3}
            />
          }
        ></Avatar>
        <StyledInput
          ref={input}
          size="small"
          placeholder={props.placeholder ? props.placeholder : "Public address"}
          suffix={validatedAddress && <Cross />}
          autoFocus={props.autoFocus}
          bordered={false}
          value={
            isDomain
              ? `${address} (${getEllipsisTxt(validatedAddress)})`
              : validatedAddress || props.receiver
          }
          onChange={(e) => {
            updateAddress(e.target.value);
          }}
          disabled={!!validatedAddress}
          style={{ ...props?.style }}
        />
      </Flex>
    </PizzaWalletCard>
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
