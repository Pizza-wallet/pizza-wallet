import React, { useState } from "react";
import styled from "styled-components";
import { SecondaryButton } from "./Buttons";
import { Link } from "react-router-dom";

const Container = styled("div")`
  width: 100%;
  padding: 1.25rem 0.9375rem 1.25rem 0.9375rem;
  background-color: #f8f2ed;
  border-radius: 2.75rem;
  position: relative;
  overflow-x: auto;
`;
const Container2 = styled("div")`
  width: 100%;
  padding: 1.25rem 0.9375rem 1.25rem 0.9375rem;
  background-color: #f8f2ed;
  border-radius: 2.75rem;
  position: relative;
  overflow-x: auto;
  opacity: 0.5;
`;

const Container3 = styled("div")`
  position: relative;
`;

const ButtonContainer = styled("div")`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-left: auto;
  margin-right: auto;
  width: 14.9375rem;
  height: 3.5625rem;
`;

const CustomTableHeader = styled("th")`
  // padding: 0.625rem 0.25rem 0.625rem 0.25rem;
  // padding: 10px 15px 10px 15px;
  padding: 30px;
  text-align: left;
  vertical-align: top;
  color: var(--brand-blue);
  font-family: "Gloria Hallelujah", sans-serif;
  -webkit-text-stroke: thin;
`;

const CustomTableData = styled("td")`
  padding: 0.625rem 1rem 2.5rem 1rem;
  text-align: left;
  vertical-align: top;
  color: var(--brand-blue);
  // font-family: "Gloria Hallelujah", sans-serif;
  -webkit-text-stroke: thin;
`;

function Table({ tableData, columns, tableTitle, expandableRow, loading }) {
  const [expandableRows, setShowExpandableRows] = useState([]);

  const renderRows = () => {
    return tableData.map((data, i) => {
      return (
        <tr key={i}>
          {columns.map((column, j) => {
            let info = data[column.dataIndex];
            return (
              <CustomTableData key={j}>
                {column.render(info, data)}
              </CustomTableData>
            );
          })}
        </tr>
      );
    });
  };

  const renderHeader = () => {
    return columns.map((val, i) => <th key={i}>{val.title}</th>);
  };

  const renderHeaderCustom = () => {
    return columns.map((val, i) => (
      <CustomTableHeader key={i}>{val.title}</CustomTableHeader>
    ));
  };

  const noData = (Array.isArray(tableData) && !tableData.length) || !tableData;
  if (noData)
    return (
      <>
        <Container3>
          <Container2>
            <p className="tabControls">{tableTitle}</p>
            <table style={{ width: "100%", height: "100%", opcaity: "0.5" }}>
              <thead>
                <tr>{renderHeader()}</tr>
              </thead>
              <tr style={{ height: "15.625rem" }}></tr>
            </table>
          </Container2>
          <ButtonContainer>
            {/* <PrimaryButton>Add tokens</PrimaryButton> */}
            {tableTitle === "Token" ? (
              <Link to="/onramper">
                <SecondaryButton>Buy tokens</SecondaryButton>
              </Link>
            ) : (
              <Link to="/dashboard">
                <SecondaryButton>No history</SecondaryButton>
              </Link>
            )}
          </ButtonContainer>
        </Container3>
      </>
    );
  return (
    <>
      <Container>
        <p className="tabControls">{tableTitle}</p>

        <table style={{ width: "100%" }}>
          <thead>
            <tr>{renderHeaderCustom()}</tr>
          </thead>
          {renderRows()}
        </table>
      </Container>
    </>
  );
}

export default Table;
