import React, { useState } from "react";
import styled from "styled-components";
import { SecondaryButton } from "./Buttons";
import { Link } from "react-router-dom";
import { Spin } from "antd";

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

const AbsoluteContainer = styled("div")`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-left: auto;
  margin-right: auto;
  width: 14.9375rem;
  height: 3.5625rem;

  ${(props) =>
    props.loadingContainer &&
    `
    width: 2.9375rem;
    height: 3.5625rem;
    `};
`;

const StyledTable = styled("table")`
  border-collapse: separate;
  border-spacing: 0;
  background-color: var(--layout-white);
  width: 100%;
  height: 80%;
  padding: 1.25rem 1.25rem 0.625rem 2.5rem;

  border: 0.125rem solid var(--brand-blue);
  border-collapse: separate;
  border-radius: 2.5625rem;
  border-spacing: 0px;
  margin: 0 auto;
  ${(props) => props.fixed && "table-layout: fixed"};
`;

function Table({ tableData, columns, tableTitle, expandableRow, loading }) {
  const [expandableRows, setShowExpandableRows] = useState([]);

  const renderRows = () => {
    return tableData.map((data, i) => {
      return (
        <tr key={i}>
          {columns.map((column, j) => {
            let info = data[column.dataIndex];
            return <td key={j}>{column.render(info, data)}</td>;
          })}
        </tr>
      );
    });
  };

  const toggleDropdown = (rowId) => {
    if (expandableRows.includes(rowId)) {
      const newRows = expandableRows.filter((e) => e !== rowId);
      setShowExpandableRows(newRows);
    } else {
      setShowExpandableRows([...expandableRows, rowId]);
    }
  };

  const renderRowsExpandable = () => {
    return tableData.map((data, i) => {
      return (
        <React.Fragment key={i}>
          <tr
            key={data.id}
            id={data.id}
            style={{ cursor: "pointer" }}
            onClick={() => toggleDropdown(data.id)}
          >
            {columns.map((column, j) => {
              let info = data[column.dataIndex];
              return <td key={j}>{column.render(info, data)}</td>;
            })}
          </tr>
          {expandableRows.includes(data.id) &&
            data.tokens.map((token, k) => {
              return (
                <tr key={k} id={data.id}>
                  {columns.map((column, l) => {
                    let info = token[column.dataIndex];
                    return <td key={l}>{column.render(info, token)}</td>;
                  })}
                </tr>
              );
            })}
        </React.Fragment>
      );
    });
  };

  const renderHeader = () => {
    return columns.map((val, i) => <th key={i}>{val.title}</th>);
  };

  const noData = (Array.isArray(tableData) && !tableData.length) || !tableData;
  if (noData)
    return (
      <>
        <Container3>
          <Container2>
            <p className="tabControls">{tableTitle}</p>
            <StyledTable
              style={{ width: "100%", height: "100%", opacity: "0.5" }}
            >
              <thead>
                <tr>{renderHeader()}</tr>
              </thead>
              <tbody>
                <tr style={{ height: "15.625rem" }}></tr>
              </tbody>
            </StyledTable>
          </Container2>
          {loading ? (
            <AbsoluteContainer loadingContainer>
              <Spin size="large"></Spin>
            </AbsoluteContainer>
          ) : (
            <AbsoluteContainer>
              {tableTitle === "Token" ? (
                <Link to="/onramper">
                  <SecondaryButton>Buy tokens</SecondaryButton>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <SecondaryButton>No history</SecondaryButton>
                </Link>
              )}
            </AbsoluteContainer>
          )}
        </Container3>
      </>
    );
  else if (expandableRow) {
    return (
      <>
        <Container>
          <p className="tabControls">{tableTitle}</p>

          <StyledTable fixed={true}>
            <thead>
              <tr>{renderHeader()}</tr>
            </thead>
            <tbody>{renderRowsExpandable()}</tbody>
          </StyledTable>
        </Container>
      </>
    );
  }
  return (
    <>
      <Container>
        <p className="tabControls">{tableTitle}</p>

        <StyledTable>
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </StyledTable>
      </Container>
    </>
  );
}

export default Table;
