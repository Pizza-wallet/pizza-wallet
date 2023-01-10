import type { FC } from "react";
import { ChainSelect } from "./ChainSelect";
import { TokenList } from "./TokenList";
import { SearchTokenInput } from "./SearchTokenInput";
import { Typography } from "antd";
import styled from "styled-components";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Title } = Typography;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 1.75rem;
  margin-top: 8px;
  color: #3e389f;
  cursor: pointer;
`;

interface ISelectTokenPage {
  formType: string;
  navigateBack: any;
}

export const SelectTokenPage: FC<ISelectTokenPage> = ({
  formType,
  navigateBack,
}) => {
  return (
    <>
      <div style={{ display: "inline-block" }}>
        <FontAwesomeIconStyled onClick={navigateBack} icon={faArrowLeft} />
      </div>
      <div
        style={{
          display: "inline-block",
          marginLeft: "85px",
        }}
      >
        <Title style={{ color: "#3e389f" }} level={4}>
          Swap {formType}
        </Title>
      </div>
      <div>
        <ChainSelect />
        <SearchTokenInput />
      </div>
      <TokenList navigateBack={navigateBack} formType={formType} />
    </>
  );
};
