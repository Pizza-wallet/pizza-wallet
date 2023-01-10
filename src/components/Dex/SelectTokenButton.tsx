import styled from "styled-components";
import { Avatar, Image } from "antd";

const Text = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  line-height: 1.5rem;
  letter-spacing: 0.02em;
  margin: 10px 0 0.625rem 10px;
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

interface ISelectTokenButton {
  formType: string;
  handleClick: any;
}

export const SelectTokenButton = ({
  formType,
  handleClick,
}: ISelectTokenButton) => {
  const token = "";
  return (
    <Card onClick={handleClick}>
      <Text>{formType}</Text>
      <Flex>
        {token ? (
          <Avatar
            src={
              <Image
                src="coin img url here"
                style={{ width: 32, marginLeft: "20px" }}
              />
            }
          />
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
