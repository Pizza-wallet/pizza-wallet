// import React from "react";
// import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../../helpers/formatters";
import { getExplorer } from "../../helpers/networks";
import "antd/dist/antd.css";
import { useERC20Transfers } from "../../hooks/useERC20Transfers";
import Table from "../reusable/Table";
import { limitDigits } from "../../helpers/formatters";
import { getChainDetails } from "../../helpers/getChainDetails";
import { CustomImg } from "../reusable/CustomImg";
import styled from "styled-components";
import Blockie from "../Blockie";

const AbsoluteImgContainer = styled("div")`
  position: absolute;
  top: -0.3125rem;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: ${(props) => props.width};
`;

function ERC20Transfers() {
  const { ERC20Transfers, chainId } = useERC20Transfers();
  // const { Moralis } = useMoralis();

  const mockData = [
    {
      address: "0x263026e7e53dbfdce5ae55ade22493f828922965",
      block_hash:
        "0xd933d2c891c310a2b7a535080366fbe45e31d984b49ea87977cd3a1a27151b18",
      block_number: "32492335",
      block_timestamp: "02/08/2022 03:15PM",
      transaction_hash:
        "0x20150f86e4af053bf30d33e1ad63fb6c4fbe353c423786256251c6188cdbf631",
      value: 100,
      to_address: "0xdB75a62b27D8F2EdBa9119F741bd317139b55dcE",
      from_address: "the-pizza-guy.eth",
      token: {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        chainId: 137,
        symbol: "USDC",
        logoUri:
          "https://storageapi.fleek.co/d1921602-c1d0-4d59-82e9-e36a2947b855-bucket/App/static/token-icons/usdc.webp",
      },
    },
    {
      address: "0x263026e7e53dbfdce5ae55ade22493f828922965",
      block_hash:
        "0xd933d2c891c310a2b7a535080366fbe45e31d984b49ea87977cd3a1a27151b18",
      block_timestamp: "09/09/2022 04:20PM",
      value: 0.6,
      from_address: "0xBe0464E1959C06c6906cC85B16C197dBcf7A789f",
      transaction_hash:
        "0x20150f86e4af053bf30d33e1ad63fb6c4fbe353c423786256251c6188cdbf631",
      to_address: "the-pizza-guy.eth",
      token: {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        chainId: 43114,
        symbol: "wETH",
        logoUri:
          "https://storageapi.fleek.co/d1921602-c1d0-4d59-82e9-e36a2947b855-bucket/App/static/token-icons/weth.png",
      },
    },
    {
      address: "0x263026e7e53dbfdce5ae55ade22493f828922965",
      block_hash:
        "0xd933d2c891c310a2b7a535080366fbe45e31d984b49ea87977cd3a1a27151b18",
      block_timestamp: "23/10/2022 06:53PM",
      transaction_hash:
        "0x20150f86e4af053bf30d33e1ad63fb6c4fbe353c423786256251c6188cdbf631",
      value: 200,
      from_address: "the-pizza-guy.eth",
      to_address: "pizza-wallet.eth",
      token: {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        chainId: 137,
        symbol: "MATIC",
        logoUri: "https://wallet-asset.matic.network/img/tokens/matic.svg",
      },
    },
    {
      address: "0x263026e7e53dbfdce5ae55ade22493f828922965",
      block_hash:
        "0xd933d2c891c310a2b7a535080366fbe45e31d984b49ea87977cd3a1a27151b18",
      block_timestamp: "23/10/2022 06:53PM",
      transaction_hash:
        "0x20150f86e4af053bf30d33e1ad63fb6c4fbe353c423786256251c6188cdbf631",
      value: 50,
      from_address: "the-pizza-guy.eth",
      to_address: "pizza-wallet.eth",
      token: {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        chainId: 137,
        symbol: "MATIC",
        logoUri: "https://wallet-asset.matic.network/img/tokens/matic.svg",
      },
    },
    {
      address: "0x263026e7e53dbfdce5ae55ade22493f828922965",
      block_hash:
        "0xd933d2c891c310a2b7a535080366fbe45e31d984b49ea87977cd3a1a27151b18",
      block_timestamp: "23/10/2022 06:53PM",
      transaction_hash:
        "0x20150f86e4af053bf30d33e1ad63fb6c4fbe353c423786256251c6188cdbf631",
      value: 24,
      from_address: "the-pizza-guy.eth",
      to_address: "pizza-wallet.eth",
      token: {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        chainId: 137,
        symbol: "MATIC",
        logoUri: "https://wallet-asset.matic.network/img/tokens/matic.svg",
      },
    },
  ];

  const columns2 = [
    {
      title: "Timestamp",
      dataIndex: "block_timestamp",
      key: "block_timestamp",
      render: (timeStamp) => {
        console.log("timestamp - ", timeStamp.split(" "));
        const dateAndTime = timeStamp.split(" ");
        return (
          <div>
            <p
              style={{
                fontFamily: "Rubik",
                fontSize: "1.125rem",
                color: "rgba(0, 0, 0, 0.7)",
              }}
            >
              {dateAndTime[0]}
            </p>
            <p
              style={{
                fontFamily: "Rubik",
                fontSize: "0.875rem",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              {dateAndTime[1]}
            </p>
          </div>
        );
      },
    },
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      render: (token, row) => {
        const tokenUri = token.logoUri;
        // get chain logo from our internal file
        const chain = token.chainId;
        const chainUri = getChainDetails(chain)?.logoUri;
        return (
          <div
            style={{
              position: "relative",
              display: "flex",
            }}
          >
            <div>
              <CustomImg
                src={tokenUri}
                alt="nologo"
                width="1.875rem"
                height="1.875rem"
              />
              <AbsoluteImgContainer left={"1.375rem"} top={"1.25rem"}>
                <CustomImg
                  src={chainUri}
                  height={"1.25rem"}
                  width={"1.25rem"}
                  borderRadius={"50%"}
                />
              </AbsoluteImgContainer>
            </div>
            <div style={{ marginLeft: "0.3125rem" }}>
              <p
                style={{
                  fontFamily: "Rubik",
                  fontSize: "1.125rem",
                  color: "#000000",
                }}
              >
                {token.symbol}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "value",
      key: "value",
      render: (value, row) => {
        console.log("logging row out here - ", row);
        const symbol = row.token.symbol;
        return (
          <div>
            <p
              style={{
                color: "#000000",
                fontFamily: "Rubik",
                fontSize: "1.125rem",
              }}
            >
              {limitDigits(value)} {symbol}
            </p>
          </div>
        );
      },
      // parseFloat(Moralis.Units.FromWei(value, item.decimals)).toFixed(6),
    },
    {
      title: "Sending Address",
      dataIndex: "from_address",
      key: "from_address",
      render: (from) => {
        return (
          <>
            <Blockie address={from} size={5} />
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(0, 0, 0, 0.6)",
                display: "inline-block",
                marginLeft: "5px",
              }}
            >
              {from.length > 30 ? getEllipsisTxt(from, 4) : from}
            </p>
          </>
        );
      },
    },
    {
      title: "Receiving Address",
      dataIndex: "to_address",
      key: "to_address",
      render: (to) => (
        <>
          <Blockie address={to} size={5} />
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(0, 0, 0, 0.6)",
              display: "inline-block",
              marginLeft: "5px",
            }}
          >
            {to.length > 30 ? getEllipsisTxt(to, 4) : to}
          </p>
        </>
      ),
    },

    {
      title: "Hash",
      dataIndex: "transaction_hash",
      key: "transaction_hash",
      render: (hash) => (
        <a
          href={`${getExplorer(chainId)}tx/${hash}`}
          target="_blank"
          rel="noreferrer"
        >
          Explorer
        </a>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          margin: "0 1.5625rem 3.125rem 1.5625rem",
          height: "100%",
        }}
      >
        <Table
          loading={!mockData}
          tableData={mockData}
          columns={columns2}
          tableTitle={"Transactions History"}
        />
      </div>
    </div>
  );
}

export default ERC20Transfers;
