import Event from "./Event";
import CornerDownReceived from "./icons/cornerDownReceived.svg";
import CornerDownSent from "./icons/cornerDownSent.svg";
import SwapSign from "./icons/swap-sign.svg";
import { CustomImg } from "../reusable/CustomImg";
import styled from "styled-components";
import Blockie from "../Blockie";
import GasUsed from "./GasUsed";
import moment from "moment";
import { apiList } from "../../helpers/explorerApis";
import SwapEvent from "./SwapEvent";

const StyledP = styled("p")`
  font-family: "Rubik", sans-serif;
  font-size: 14px;
  color: grey;
  line-height: 17px;
  letter-spacing: 0.04em;
  margin-left: 40px;
`;

export const TransferColumns = [
  {
    title: "Event",
    dataIndex: "token",
    key: "token",
    render: (token: any, item: any) => {
      console.log(token);
      if (!item) {
        return null;
      }

      if (item.type === "swap") {
        return (
          <SwapEvent
            fromToken={item.fromToken}
            toToken={item.toToken}
            toAmount={item.toAmount}
            toAmountUSD={item.toAmountUSD}
            decimals={item.decimals}
          />
        );
      } else if (item.type === "nft") {
        const { image, name } = item.nftMetadata.normalized_metadata;
        return (
          <Event
            chainId={item.chainId}
            tokenAddress={item.token_address}
            value={item.tokenID}
            type={item.type}
            name={name}
            tokenUri={image}
          />
        );
      }
      return (
        <Event
          chainId={item.chainId}
          tokenAddress={item.contractAddress}
          value={item.value}
          type={item.type}
          name={item.name}
          tokenUri={item.token_uri}
        />
      );
    },
  },
  {
    title: "Result",
    dataIndex: "to",
    key: "to",
    render: (to: any, item: any) => {
      if (item.type === "swap") {
        return (
          <div>
            <div
              style={{
                position: "relative",
              }}
            >
              <>
                <div style={{ display: "flex" }}>
                  <CustomImg
                    width={"2.4375rem"}
                    height={"2.4375rem"}
                    src={SwapSign}
                  />
                  <p
                    style={{
                      fontSize: "20px",
                      color: "#3E389F",
                      marginLeft: "10px",
                    }}
                  >
                    Swap
                  </p>
                </div>
              </>
              {item.gasCostUSD !== "0" && (
                <StyledP>${item.gasCostUSD} gas fee</StyledP>
              )}
            </div>
          </div>
        );
      }

      // if it's to users address they receive if not it was sent.
      const didUserReceive =
        to.toLowerCase() === process.env.REACT_APP_TEST_ACCOUNT?.toLowerCase();
      const minted =
        item.from === "0x0000000000000000000000000000000000000000" ||
        item.from === item.contractAddress;

      return (
        <div>
          <div
            style={{
              position: "relative",
            }}
          >
            <>
              {didUserReceive || minted ? (
                <>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <CustomImg
                      width={"2.4375rem"}
                      height={"2.4375rem"}
                      src={CornerDownReceived}
                    />
                    <p
                      style={{
                        fontSize: "20px",
                        color: "#4DC359",
                        marginLeft: "10px",
                      }}
                    >
                      {minted ? "Minted" : "Received"}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex" }}>
                    <CustomImg
                      width={"2.4375rem"}
                      height={"2.4375rem"}
                      src={CornerDownSent}
                    />
                    <p
                      style={{
                        fontSize: "20px",
                        color: "#F34337",
                        marginLeft: "10px",
                      }}
                    >
                      Sent
                    </p>
                  </div>
                  <GasUsed
                    chainId={item.chainId}
                    tokenAddress={item.contractAddress}
                    gasUsed={item.gasUsed}
                  />
                </>
              )}
            </>
          </div>
        </div>
      );
    },
  },

  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: (from: any, item: any) => {
      if (item.type === "swap") {
        from = item.fromAddress;
      }
      const shortFromAddress = `${from.substring(0, 6)}...${from.substring(
        from.length - 4,
      )}`;

      return (
        <div>
          <div style={{ display: "flex" }}>
            <Blockie address={from.toLowerCase()} size={8} scale={3} />
            <p
              style={{
                fontSize: "1.125rem",
                color: "rgba(0, 0, 0, 0.6)",
                display: "inline-block",
                marginLeft: "0.3125rem",
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "1.3125rem",
                letterSpacing: "0.04rem",
              }}
            >
              {shortFromAddress}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    title: "To",
    dataIndex: "to",
    key: "to",
    render: (to: any, item: any) => {
      if (item.type === "swap") {
        to = item.toAddress;
      }

      const shortTo = to.substring(0, 6) + "..." + to.substring(to.length - 4);

      return (
        <div>
          <div style={{ display: "flex" }}>
            <Blockie address={to.toLowerCase()} size={8} scale={3} />
            <p
              style={{
                fontSize: "1.125rem",
                color: "rgba(0, 0, 0, 0.6)",
                display: "inline-block",
                marginLeft: "5px",
              }}
            >
              {shortTo}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    title: "Time",
    dataIndex: "timeStamp",
    key: "timeStamp",
    render: (timeStamp: any, item: any) => {
      let formattedDate;
      if (item.type === "swap") {
        timeStamp = item.steps[0].execution.process[0].doneAt;
        formattedDate = moment(timeStamp).format("DD-MM-YYYY");
      } else {
        formattedDate = moment(timeStamp * 1000).format("DD-MM-YYYY");
      }

      const time = moment(timeStamp * 1000).format("HH:mm");

      return (
        <div>
          <p
            style={{
              fontFamily: "Rubik",
              fontSize: "1.125rem",
              color: "rgba(0, 0, 0, 0.7)",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "1.3125rem",
              letterSpacing: "0.04rem",
            }}
          >
            {formattedDate}
          </p>
          <p
            style={{
              fontFamily: "Rubik",
              fontSize: "0.875rem",
              color: "grey",
            }}
          >
            {time}
          </p>
        </div>
      );
    },
  },

  {
    title: "Details",
    dataIndex: "hash",
    key: "hash",
    render: (hash: any, item: any) => {
      let blockExplorerUrl;

      if (item.type === "swap") {
        blockExplorerUrl = item.steps[0].execution.process[0].txLink;
      } else {
        blockExplorerUrl = apiList.find((val) => {
          if (val.chainId === item.chainId.toString()) {
            return val;
          }
        })?.blockExplorerEndpoint;
      }

      return (
        <div>
          <div style={{ display: "block" }}>
            <a
              href={
                item.type === "swap"
                  ? item.steps[0].execution.process[0].txLink
                  : `${blockExplorerUrl}/tx/${hash}`
              }
              target="_blank"
              rel="noreferrer"
            >
              See more
            </a>
          </div>
        </div>
      );
    },
  },
];
