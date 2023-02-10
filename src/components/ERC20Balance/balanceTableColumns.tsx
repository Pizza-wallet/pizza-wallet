import styled from "styled-components";
import { limitDigits } from "../../helpers/formatters";
import { CustomImg } from "../reusable/CustomImg";

interface IAbsoluteImgContainer {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: string;
}

const AbsoluteImgContainer = styled("div")`
  position: absolute;
  top: -0.3125rem;
  top: ${(props: IAbsoluteImgContainer) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: ${(props) => props.width};
`;

const StyledTabledata = styled("p")`
  color: #000000;
`;

const displayChainIconsForToken = (chainIcons: string[]) => {
  // Logic to overlap icon images
  let num = 0;
  return chainIcons.map((icon, i) => {
    if (i > 0) {
      num = num - 5;
    }
    return (
      <div key={i} style={{ transform: `translateX(${num}px)` }}>
        <CustomImg
          src={icon}
          height={"1.25rem"}
          width={"1.25rem"}
          borderRadius={"50%"}
          display={"inline-block"}
        />
      </div>
    );
  });
};

const centerChainLogos = (logoAmount: number) => {
  // TODO: figure out a better way to center these icons
  switch (logoAmount) {
    case 1:
      return "0.6rem";
    case 2:
      return "0.1rem";
    case 3:
      return "-0.3rem";
    case 4:
      return "-1rem";
    case 5:
      return "-1.25rem";
    default:
      return "-1.25rem";
  }
};

export const columns = [
  {
    title: "Asset",
    dataIndex: "logo",
    key: "logo",
    render: (logo: any, item: any, num: number) => {
      console.log("logo here - ", logo);
      const isToken = item.type === "token";
      const logoURI = item.logoURI ? item.logoURI : "";
      const chainLogosForToken = item.chainLogoUri;
      const emptyTokenLogo = "https://etherscan.io/images/main/empty-token.png";
      return (
        <div
          style={{
            display: "flex",
            position: "relative",
            margin: isToken ? "auto" : "0",
            width: isToken ? "50%" : "auto",
          }}
        >
          <div>
            <AbsoluteImgContainer
              left={isToken ? "1.5625rem" : ""}
              top={"-0.3125rem"}
            >
              <CustomImg
                src={logoURI || emptyTokenLogo}
                alt="nologo"
                width="2.5rem"
                height="2.5rem"
                borderRadius={"50%"}
              />
            </AbsoluteImgContainer>
            {isToken && (
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    borderBottom: "0.1875rem solid #a6a6a6",
                    borderLeft: "0.1875rem solid #a6a6a6",
                    height: num > 0 ? "4.7875rem" : "2.5rem",
                    position: "absolute",
                    top: num > 0 ? "-3.5625rem" : "-1.25rem",
                    left: "-2.8125rem",
                    width: "2.375rem",
                  }}
                ></div>
              </div>
            )}
            {isToken ? (
              <AbsoluteImgContainer left={"3.9875rem"} top={"1.2375rem"}>
                <CustomImg
                  src={item.chainLogoUri || emptyTokenLogo}
                  height={"1.25rem"}
                  width={"1.25rem"}
                  borderRadius={"50%"}
                />
              </AbsoluteImgContainer>
            ) : (
              <AbsoluteImgContainer
                left={centerChainLogos(chainLogosForToken.length)}
                top={"2.2rem"}
                width={"2.1875rem"}
              >
                <div
                  style={{
                    minWidth: "max-content",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {displayChainIconsForToken(chainLogosForToken)}
                </div>
              </AbsoluteImgContainer>
            )}
            {!isToken && (
              <div
                style={{
                  marginLeft: "3.125rem",
                  fontSize: "1.5625rem",
                  lineHeight: "2.25rem",
                  color: "#000000",
                }}
              >
                {item.symbol}
              </div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    render: (value: number) => (
      <StyledTabledata>{limitDigits(value)}</StyledTabledata>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (value: number) =>
      value ? (
        <StyledTabledata>{`$${limitDigits(value)}`}</StyledTabledata>
      ) : (
        "Not available"
      ),
  },

  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    render: (value: number) =>
      value ? (
        <StyledTabledata>{`$${limitDigits(value)}`}</StyledTabledata>
      ) : (
        "Not available"
      ),
  },
];
