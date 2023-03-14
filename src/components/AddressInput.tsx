import { useRef } from "react";
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

interface IAddressInput {
  validatedAddress: any;
  updateAddress: any;
  isDomain: any;
  address: any;
}

function AddressInput({
  validatedAddress,
  updateAddress,
  isDomain,
  address,
}: IAddressInput) {
  const input = useRef<any>(null);

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
    </svg>
  );

  return (
    <PizzaWalletCard height={"6.25rem"}>
      <Text>Send to</Text>
      <Flex>
        <Avatar.Group>
          <Avatar
            style={{
              marginLeft: "1.25rem",
              color: "#f56a00",
              backgroundColor: "#e8e8e8",
            }}
            src={
              validatedAddress && (
                <Blockie
                  address={(isDomain
                    ? validatedAddress
                    : address
                  ).toLowerCase()}
                  size={10}
                  scale={3}
                />
              )
            }
          ></Avatar>
        </Avatar.Group>
        <StyledInput
          ref={input}
          size="small"
          placeholder={"Public address"}
          maxLength={42}
          suffix={validatedAddress && <Check />}
          autoFocus={true}
          bordered={false}
          value={
            isDomain
              ? `${address} (${getEllipsisTxt(validatedAddress)})`
              : validatedAddress || address
          }
          onChange={(e) => {
            updateAddress(e.target.value);
          }}
          // disabled={!!validatedAddress}
        />
      </Flex>
    </PizzaWalletCard>
  );
}

export default AddressInput;
