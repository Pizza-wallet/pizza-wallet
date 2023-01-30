import styled from "styled-components";

const Card = styled("div")`
  width: 26.8em;
  margin-left: auto;
  margin-right: auto;
  border: 0.125rem solid #3e389f;
  background-color: #f8f2ed;
  border-radius: 2.75rem;
  padding: 0.425rem;
`;

const InnerCard = styled("div")`
  position: relative;
  border: 0.125rem solid #3e389f;
  background-color: #f8f2ed;
  border-radius: 2.5625rem;
  padding: 1.25rem;
  width: 25.6em;
`;

const Header = styled("div")`
  color: #3e389f;
  font-family: "Gloria Hallelujah", sans-serif;
  font-size: 1.5rem;
  padding: 0.625rem 0 0.625rem 1.25rem;
  -webkit-text-stroke: thin;
`;

interface IPizzawalletModal {
  header: string;
  children: any;
  bottomLogo?: any;
}

export default function PizzawalletModal({
  header,
  children,
  bottomLogo,
}: IPizzawalletModal) {
  return (
    <Card>
      <Header>
        <p>{header}</p>
      </Header>
      <InnerCard>{children}</InnerCard>
      {bottomLogo && bottomLogo}
    </Card>
  );
}
