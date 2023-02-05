import { utils } from "ethers";

export const TransferColumns = [
  {
    title: "Event",
    dataIndex: "token",
    key: "token",
    render: (token: any, item: any) => {
      console.log("token - ", token);
      if (!item) {
        return null;
      }

      // use information from item to get information on the token and amount etc

      return (
        <div>
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
                {item.value &&
                  parseFloat(utils.formatEther(item.value)).toFixed(2)}{" "}
                USD
              </p>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    title: "Result",
    dataIndex: "to",
    key: "to",
    render: (to: any) => {
      if (!to) {
        return null;
      }

      // check if to is equal to users address, if so it's received if not then transferrred

      return (
        <div>
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
              ></p>
            </div>
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
          <div>
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
          <div>
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
        </div>
      );
    },
  },

  {
    title: "Details",
    dataIndex: "hash",
    key: "hash",
    render: (hash: any) => {
      if (!hash) {
        return null;
      }
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
