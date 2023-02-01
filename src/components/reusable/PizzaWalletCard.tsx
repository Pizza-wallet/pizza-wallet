import styled from "styled-components";

export const PizzaWalletCard = styled("div")`
  width: 95%;
  border: 0.125rem solid #3e389f;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  margin: auto;
  margin-top: 30px;
  height: ${({
    height,
  }: {
    height?: string;
    hover?: boolean;
    padding?: string;
  }) => height};
  padding: ${({ padding }) => padding};

  ${({ hover }) =>
    hover &&
    `
    &:hover {
      background: #e8e8e8;
    }
`}
`;
