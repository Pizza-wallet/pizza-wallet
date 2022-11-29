import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";
import { columns } from "../ERC20Balance/balanceTableColumns";

const balances = [
  {
    name: "Ethereum",
    type: "groupedToken",
    symbol: "ETH",
    id: "EthId",
    chainLogoUri: ["chainLogo", "chainLogo"],
    logoURI: "logoURI",
    price: 1234,
    balance: 5,
    value: 6170,
    tokens: [
      {
        chainId: 1,
        address: "0x0000000000000000000",
        name: "Ethereum",
        symbol: "Eth",
        decimals: 18,
        logoURI: "logoURI",
        chainLogoUri: ["chainLogo", "chainLogo"],
        amount: "2",
        balance: 2,
        price: 1234,
        value: 2468,
        priceUSD: "1234",
      },
      {
        chainId: 137,
        address: "0x0000000000000000000",
        name: "Ethereum",
        symbol: "Eth",
        decimals: 18,
        logoURI: "logoURI",
        chainLogoUri: ["chainLogo", "chainLogo"],
        amount: "3",
        value: 3702,
        balance: 3,
        price: 1234,
        priceUSD: "1234",
      },
    ],
  },
  {
    name: "Matic",
    type: "groupedToken",
    symbol: "MATIC",
    id: "MaticId",
    chainLogoUri: ["chainLogo", "chainLogo"],
    logoURI: "logoURI",
    price: 0.822,
    balance: 15,
    value: 12.33,
    tokens: [
      {
        chainId: 137,
        address: "0x0000000000000000000",
        name: "Matic",
        symbol: "MATIC",
        decimals: 18,
        logoURI: "logoURI",
        chainLogoUri: ["chainLogo", "chainLogo"],
        amount: "15",
        value: 12.33,
        balance: 15,
        price: 0.822,
        priceUSD: "0.822",
      },
    ],
  },
];

test("Table renders correct data", () => {
  render(
    <Table
      loading={false}
      tableData={balances}
      columns={columns}
      tableTitle={"Token"}
      expandableRow={true}
    />,
  );
  const ethereum = screen.getByText(/ETH/i);
  const matic = screen.getByText(/MATIC/i);
  expect(ethereum).toBeInTheDocument();
  expect(matic).toBeInTheDocument();
});

test("Table shows correct token data when row is clicked on", () => {
  render(
    <Table
      loading={false}
      tableData={balances}
      columns={columns}
      tableTitle={"Token"}
      expandableRow={true}
    />,
  );
  const ethereum = screen.getByText(/ETH/i);

  fireEvent.click(ethereum);

  const firstEthAmount = screen.getByText(/2468/i);
  const secondEthAmount = screen.getByText(/3702/i);
  expect(firstEthAmount).toBeInTheDocument();
  expect(secondEthAmount).toBeInTheDocument();
});
