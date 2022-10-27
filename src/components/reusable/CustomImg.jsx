import styled from "styled-components";

export const CustomImg = styled("img")`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.borderRadius};
  display: ${(props) => props.display};
`;
