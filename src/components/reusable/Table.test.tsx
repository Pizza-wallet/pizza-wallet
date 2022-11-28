import { render, screen } from "@testing-library/react";
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
    balance: 2,
    value: 2468,
    tokens: [
      {
        chainId: 1,
        address: "0x0000000000000000000",
        name: "Ethereum",
        symbol: "Eth",
        decimals: 18,
        logoURI: "logoURI",
        amount: "2",
        value: 2468,
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
        amount: "15",
        value: 12.33,
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
