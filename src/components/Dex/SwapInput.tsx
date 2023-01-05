import { Avatar, Image, Input } from "antd";
import styled from "styled-components";

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

const StyledInput = styled(Input)`
  font-size: 24;
  font-weight: 700;
  box-shadow: none;
  color: #3e389f;
`;

export const SwapInput = () => {
  const token = "";

  return (
    <Card>
      <Text>You pay</Text>
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
            <StyledInput
              size="small"
              autoComplete="off"
              placeholder="0"
              bordered={false}
              // inputProps={{
              //   inputMode: "decimal",
              // }}
              // onChange={handleChange}
              // onBlur={handleBlur}
              // value={value}
              // name={amountKey}
              // disabled={disabled}
              required
            />
          </>
        )}
      </Flex>
    </Card>
  );
};
