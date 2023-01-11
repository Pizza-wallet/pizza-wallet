import styled from "styled-components";
import { Avatar, Image } from "antd";
import { useChain } from "../../hooks/useChain";
import { useToken } from "../../hooks/useToken";

const Text = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  line-height: 1.5rem;
  letter-spacing: 0.02em;
  margin: 10px 0 0.625rem 10px;
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

const Card = styled("div")`
  width: 95%;
  height: 100px;
  border: 0.125rem solid #3e389f;
  border-radius: 10px;
  cursor: pointer;
  margin: auto;
  margin-top: 30px;
  &:hover {
    background: #e8e8e8;
  }
`;

const Flex = styled("div")`
  display: flex;
  justify-content: start;
`;

interface ISelectChainTokenBtn {
  formType: string;
  handleClick: any;
  setFormType: any;

  chainId: any;
  tokenAddress: any;
}

export const SelectChainTokenBtn = ({
  formType,
  handleClick,
  setFormType,
  chainId,
  tokenAddress,
}: ISelectChainTokenBtn) => {
  const { chain, isLoading: isChainLoading } = useChain(chainId);
  const { token, isLoading: isTokenLoading } = useToken(chainId, tokenAddress);

  const handleCardClick = () => {
    handleClick();
    setFormType(formType);
  };

  return (
    <Card onClick={handleCardClick}>
      <Text>{formType}</Text>
      <Flex>
        {token && chain ? (
          <Flex>
            <Avatar.Group>
              <Avatar
                style={{ marginLeft: "10px" }}
                src={<Image src={token.logoURI} style={{ width: 32 }} />}
              >
                {token.symbol[0]}
              </Avatar>
              <Avatar
                style={{ marginTop: "15px" }}
                size={20}
                src={chain.logoURI}
              />
            </Avatar.Group>
            <div style={{ marginLeft: "10px" }}>
              <SymbolText>{token.symbol}</SymbolText>
              <Text2>On {chain.name}</Text2>
            </div>
          </Flex>
        ) : (
          <>
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#e8e8e8",
                marginLeft: "20px",
              }}
            ></Avatar>
            <Text>Select chain and token</Text>
          </>
        )}
      </Flex>
    </Card>
  );
};
