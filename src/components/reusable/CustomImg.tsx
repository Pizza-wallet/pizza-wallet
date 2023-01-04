import styled from "styled-components";

interface ICustomImg {
  height?: string;
  width?: string;
  margin?: string;
}

export const CustomImg = styled("img")`
  height: ${(props: ICustomImg) => props.height};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.borderRadius};
  display: ${(props) => props.display};
`;
