import React from "react";
import styled from "styled-components";
import { Avatar, Image, Tag, Tooltip } from "antd";
import { useChain } from "../../../hooks/useChain";
import { useToken } from "../../../hooks/useToken";
import {
  formatTokenAmount,
  formatTokenPrice,
  limitDigits,
} from "../../../helpers/formatters";
import { getGasCostsBreakdown } from "./utils";
import {
  faGasPump,
  faClock,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = styled("div")`
  width: 95%;
  height: 115px;
  border: 0.125rem solid #3e389f;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  margin: auto;
  margin-top: 30px;
  height: 200px;
`;

const Flex = styled("div")`
  display: flex;
  justify-content: start;
  justify-content: ${(props: {
    justifyContent?: string;
    marginBottom?: string;
    marginLeft?: string;
  }) => props.justifyContent};

  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
`;

const SymbolText = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.5rem;
  letter-spacing: 0.02em;
`;

const Text2 = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 13px;
  line-height: 1.5rem;
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 15px;
  color: #3e389f;
`;

interface ISwapRouteCard {
  toToken: any;
  toAmount: any;
  route: any;
}

export const SwapRouteCard: React.FC<ISwapRouteCard> = ({
  toToken,
  toAmount,
  route,
}) => {
  const { chain } = useChain(toToken.chainId);
  const { token, isLoading } = useToken(toToken.chainId, toToken.address);

  const formattedTokenAmount = formatTokenAmount(toAmount, token?.decimals);
  const formattedTokenPrice = formatTokenPrice(
    formattedTokenAmount,
    token?.priceUSD,
  );

  const step = route.steps[0];
  const gasCostUSD = parseFloat(route.gasCostUSD ?? "") || 0.01;
  const gasCosts = getGasCostsBreakdown(route);

  const tag = route.tags?.length ? route.tags[0] : "NORMAL";
  const tagColor = tag === "RECOMMENDED" ? "green" : "cyan";

  const executionTimeMinutes = Math.ceil(
    route.steps
      .map((step: any) => step.estimate.executionDuration)
      .reduce((duration: number, x: number) => duration + x, 0) / 60,
  );

  const gasCostTooltipText = (
    <span>
      {gasCosts.map((gas) => (
        <>
          <p>Estimated network fee</p>
          <p key={`${gas.token.address}${gas.token.symbol}`}>
            {gas.amount?.toFixed(6)} {gas.token.symbol} {`($${gas.amountUSD})`}
          </p>
        </>
      ))}
    </span>
  );

  return (
    <Card>
      <Flex marginBottom={"20px"} justifyContent={"space-between"}>
        <Tag color={tagColor}>{tag}</Tag>
        <Tooltip placement="top" title={gasCostTooltipText}>
          <div style={{ display: "flex" }}>
            <div style={{ display: "inline-block", marginRight: "5px" }}>
              <FontAwesomeIconStyled icon={faGasPump} />
            </div>

            <Text2>${gasCostUSD}</Text2>
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title={"Estimated swap execution time in minutes"}
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "inline-block", marginRight: "5px" }}>
              <FontAwesomeIconStyled icon={faClock} />
            </div>

            <Text2>{executionTimeMinutes}m</Text2>
          </div>
        </Tooltip>
        <Tooltip
          placement="top"
          title={
            "A number of swap steps. Each step can contain 1-2 transaction which require a signature"
          }
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "inline-block", marginRight: "5px" }}>
              <FontAwesomeIconStyled icon={faLayerGroup} />
            </div>

            <Text2>{route.steps.length}</Text2>
          </div>
        </Tooltip>
      </Flex>
      <Flex>
        <Avatar.Group>
          <Avatar
            style={{ marginLeft: "10px" }}
            src={<Image src={token?.logoURI} style={{ width: 32 }} />}
          >
            {token?.symbol[0]}
          </Avatar>
          <Avatar
            style={{ marginTop: "15px" }}
            size={20}
            src={chain?.logoURI}
          />
        </Avatar.Group>
        <div style={{ marginLeft: "10px", display: "flex" }}>
          <div>
            <SymbolText>{formattedTokenAmount}</SymbolText>
            <Text2>${limitDigits(formattedTokenPrice)}</Text2>
          </div>
          {step ? (
            <Flex marginLeft={"5px"}>
              <div>
                <Avatar
                  src={step.toolDetails.logoURI}
                  alt={step.toolDetails.name}
                  size={"small"}
                >
                  {step.toolDetails.name[0]}
                </Avatar>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "5px",
                  color: "grey",
                }}
              >
                {step.toolDetails.name}
              </p>
            </Flex>
          ) : null}
        </div>
      </Flex>
    </Card>
  );
};
