import Event from "./Event";
import CornerDownReceived from "./icons/cornerDownReceived.svg";
import CornerDownSent from "./icons/cornerDownSent.svg";
import { CustomImg } from "../reusable/CustomImg";
import styled from "styled-components";
import Blockie from "../Blockie";
import moment from "moment";
import { apiList } from "../../helpers/explorerApis";
import SwapEvent from "./SwapEvent";

const StyledP = styled("p")`
  font-family: "Rubik", sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
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
        return <SwapEvent fromToken={item.fromToken} toToken={item.toToken} />;
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
      if (!to) {
        return null;
      }

      // check if to is equal to users address, if so it's received if not then transferrred
      // if it's to users address they receive if not it was sent.
      const didUserReceive = to === process.env.REACT_APP_TEST_ACCOUNT;
      const minted = item.minter_address === process.env.REACT_APP_TEST_ACCOUNT;

      console.log("item?? - ", item);

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
                </>
              )}
            </>
            <StyledP>{item.gasUsed} gas fee</StyledP>
          </div>
        </div>
      );
    },
  },

  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: (from: any) => {
      if (!from) {
        return null;
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
                marginLeft: "5px",
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
    render: (to: any) => {
      if (!to) {
        return null;
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
    render: (timeStamp: any) => {
      if (!timeStamp) {
        return null;
      }
      const date = new Date(timeStamp * 1000);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const formattedDate = `${day}-${month}-${year}`;
      const time = moment(timeStamp * 1000).format("HH:mm");

      return (
        <div>
          <p
            style={{
              fontFamily: "Rubik",
              fontSize: "1.125rem",
              color: "rgba(0, 0, 0, 0.7)",
            }}
          >
            {formattedDate}
          </p>
          <p
            style={{
              fontFamily: "Rubik",
              fontSize: "1.125rem",
              color: "rgba(0, 0, 0, 0.7)",
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
      if (!hash) {
        return null;
      }

      // This is the url for the api but the principle is the same just put the needed urls in the config and get them here with chainId
      const blockExplorerUrl = apiList.find((val) => {
        if (val.chainId === item.chainId.toString()) {
          return val;
        }
      })?.endpoint;

      console.log("block explorer url - ", blockExplorerUrl);
      return (
        <div>
          <div style={{ display: "block" }}>
            <a
              href={`https://polygonscan.com/tx/${hash}`}
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
