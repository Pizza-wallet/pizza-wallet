// import React from "react";
// import { useMoralis } from "react-moralis";
// import { getEllipsisTxt } from "../../helpers/formatters";
// import { getExplorer } from "../../helpers/networks";
import "antd/dist/antd.css";
import { useERC20Transfers } from "../../hooks/useERC20Transfers";
import Table from "../reusable/Table";
// import { limitDigits } from "../../helpers/formatters";
// import { getChainDetails } from "../../helpers/getChainDetails";
// import { CustomImg } from "../reusable/CustomImg";
import styled from "styled-components";
import Blockie from "../Blockie";

import React, { useState, useEffect } from "react";
import { utils } from "ethers";
import { fetchNftData } from "./utils";

interface IStyled {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: string;
}

const AbsoluteImgContainer = styled("div")`
  position: absolute;
  top: -0.3125rem;
  top: ${(props: IStyled) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: ${(props) => props.width};
`;

function ERC20Transfers() {
  const { ERC20Transfers, chainId } = useERC20Transfers();

  // new implement
  const [fetchData, setFetchData] = useState({});

  const [loading, setLoading] = useState(false);

  // it will flatten all the data into one
  const allData = Object.values(fetchData).flat();

  const handleData = async () => {
    const data = await fetchNftData();
    setFetchData(data);
  };

  useEffect(() => {
    setLoading(true);
    handleData();
    setLoading(false);
  }, []);

  const mockData = [
    {
      address: "0x263026e7e53dbfdce5ae55ade22493f828922965",
      block_hash:
        "0xd933d2c891c310a2b7a535080366fbe45e31d984b49ea87977cd3a1a27151b18",
      block_number: "32492335",
      block_timestamp: "02/08/2022 03:15PM",
      transaction_hash:
        "0x20150f86e4af053bf30d33e1ad63fb6c4fbe353c423786256251c6188cdbf631",
      value: 108,
      to_address: "0xdB75a62b27D8F2EdBa9119F741bd317139b55dcE",
      from_address: "the-pizza-guy.eth",
      token: {
        address: "-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        chainId: 137,
        symbol: "USDC",
        logoUri:
          "https://storageapi.fleek.co/d1921602-c1d0-4d59-82e9-e36a2947b855-bucket/App/static/token-icons/usdc.webp",
      },
    },
  ];

  // Multiple Blockchain Links
  // Todo this part for multiple blockchain explorer link
  // const explorerLinks = {
  //   Ethereum: "https://etherscan.io/tx/",
  //   Polygon: "https://polygonscan.com/tx/",
  //   Binance: "https://bscscan.com/tx/",
  //   Fantom: "https://ftmscan.com/tx/tx/",
  //   Gnosis: "https://gnosisscan.io/tx/",
  //   Avalanche: "https://snowtrace.io/tx/",
  //   Arbitrum: "https://arbiscan.io/tx/",
  //   Optimism: "https://optimistic.etherscan.io/tx/",
  //
  // };

  const columns = [
    {
      title: "Timestamp",
      dataIndex: "block_timestamp",
      key: "block_timestamp",
      render: () => {
        if (!Array.isArray(allData)) {
          return null;
        }
        return (
          <div>
            {allData.map((item) => {
              const timestamp = item.timeStamp;
              const date = new Date(timestamp * 1000);

              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();

              const formattedDate = `${day}-${month}-${year}`;

              return (
                <p
                  style={{
                    fontFamily: "Rubik",
                    fontSize: "1.125rem",
                    color: "rgba(0, 0, 0, 0.7)",
                  }}
                >
                  {formattedDate}
                </p>
              );
            })}
            {/* <p
              style={{
                fontFamily: "Rubik",
                fontSize: "0.875rem",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              {dateAndTime[1]}
            </p> */}
          </div>
        );
      },
    },
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      render: () => {
        if (!Array.isArray(allData)) {
          return null;
        }

        return (
          <div>
            {allData.map((item) => {
              return (
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                  }}
                >
                  <div style={{ marginLeft: "0.3125rem" }}>
                    <p
                      style={{
                        fontFamily: "Rubik",
                        fontSize: "1.125rem",
                        color: "#000000",
                      }}
                    >
                      {item.tokenSymbol}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      },
    },

    {
      title: "Amount",
      dataIndex: "value",
      key: "value",
      render: () => {
        // Make sure allData is defined and is an array
        if (!Array.isArray(allData)) {
          return null;
        }

        return (
          <div>
            {allData.map((item) => {
              return (
                <div>
                  <p
                    style={{
                      color: "#000000",
                      fontFamily: "Rubik",
                      fontSize: "1.125rem",
                    }}
                  >
                    {/* {item.value}
                     */}
                    {parseFloat(utils.formatEther(item.value)).toFixed(2)} USD
                  </p>
                </div>
              );
            })}
          </div>
        );
      },
    },

    {
      title: "Sending Address",
      dataIndex: "from_address",
      key: "from_address",
      render: () => {
        if (!Array.isArray(allData)) {
          return null;
        }

        return (
          <div>
            {allData.map((item) => {
              const shortFromAddress = `${item.from.substring(
                0,
                6,
              )}...${item.from.substring(item.from.length - 4)}`;

              return (
                <div>
                  {/* <Blockie address={from} size={5} /> */}
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "rgba(0, 0, 0, 0.6)",
                      display: "inline-block",
                      marginLeft: "5px",
                    }}
                  >
                    {shortFromAddress}
                  </p>
                </div>
              );
            })}
          </div>
        );
      },
    },

    {
      title: "Receiving Address",
      dataIndex: "to_address",
      key: "to_address",
      render: () => {
        if (!Array.isArray(allData)) {
          return null;
        }

        return (
          <div>
            {allData.map((item) => {
              const shortTo =
                item.to.substring(0, 6) +
                "..." +
                item.to.substring(item.to.length - 4);

              return (
                <div>
                  {/* <Blockie address={from} size={5} /> */}
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "rgba(0, 0, 0, 0.6)",
                      display: "inline-block",
                      marginLeft: "5px",
                    }}
                  >
                    {shortTo}
                  </p>
                </div>
              );
            })}
          </div>
        );
      },
    },

    {
      title: "Hash",
      dataIndex: "transaction_hash",
      key: "transaction_hash",
      render: () => {
        // Make sure allData is defined and is an array
        if (!Array.isArray(allData)) {
          return null;
        }

        return (
          <div>
            {allData.map((item) => {
              return (
                <div style={{ display: "block" }}>
                  <a
                    href={`https://polygonscan.com/tx/${item.hash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Explorer
                  </a>
                  {/* Todo multiple blockchain part */}
                  {/* <a
                    href={`${explorerLinks[]}${item.hash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Explorer
                  </a> */}
                </div>
              );
            })}
          </div>
        );
      },
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
          // loading={!mockData}
          tableData={mockData}
          columns={columns}
          tableTitle={"Transactions History"}
          expandableRow={false}
          // tableData={undefined}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ERC20Transfers;
