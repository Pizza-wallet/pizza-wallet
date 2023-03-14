import React, { useState } from "react";
import styled from "styled-components";
import { SecondaryButton } from "./Buttons";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { IToken } from "../../types";

interface ITableStyles {
  loadingContainer?: boolean;
  fixed?: boolean;
}

const Container = styled("div")`
  // width: 100%;
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

  ${(props: ITableStyles) =>
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
  ${(props: ITableStyles) => props.fixed && "table-layout: fixed"};
`;

const StyledTableScroll = styled("table")`
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
  ${(props: ITableStyles) => props.fixed && "table-layout: fixed"};

  tr {
    display: grid;
    grid-template-columns: ${(props: ITableStyles) =>
      props.fixed ? "1fr 1fr 1fr 1fr" : "4fr 3fr 2fr 2fr 2fr 1fr"};
    grid-gap: 10px;
  }
`;

const StyledTHead = styled("thead")`
  tr {
    display: grid;
    grid-template-columns: ${(props: ITableStyles) =>
      props.fixed ? "1fr 1fr 1fr 1fr" : "4fr 3fr 2fr 2fr 2fr 1fr"};
    grid-gap: 10px;
  }
`;

const StyledTBody = styled("tbody")`
  display: block;
  width: 100%;
  overflow: overlay;
  height: 400px;
`;

interface ITable {
  tableData: any;
  columns: Column;
  tableTitle: string;
  expandableRow: boolean;
  loading: boolean;
}

interface IColumnData {
  title: string;
  dataIndex: string;
  key: string;
  render: any;
}

type Column = Array<IColumnData>;

function Table({
  tableData,
  columns,
  tableTitle,
  expandableRow,
  loading,
}: ITable) {
  const [expandableRows, setShowExpandableRows] = useState<string[]>([]);

  const renderRows = () => {
    return tableData.map((data: any, i: number) => {
      return (
        <tr key={i}>
          {columns.map((column: IColumnData, j: number) => {
            let info = data[column.dataIndex];
            return <td key={j}>{column.render(info, data)}</td>;
          })}
        </tr>
      );
    });
  };

  const toggleDropdown = (rowId: string) => {
    if (!rowId) return;
    if (expandableRows.includes(rowId)) {
      const newRows = expandableRows.filter((e) => e !== rowId);
      setShowExpandableRows(newRows);
    } else {
      setShowExpandableRows([...expandableRows, rowId]);
    }
  };

  const renderRowsExpandable = () => {
    return tableData.map((data: any, i: number) => {
      // if user has more than one token on each chain allow them to toggle row.
      const allowUserToToggleRow = data.tokens.length > 1;
      return (
        <React.Fragment key={i}>
          <tr
            key={data.id}
            id={data.id}
            style={allowUserToToggleRow ? { cursor: "pointer" } : {}}
            onClick={() =>
              toggleDropdown(allowUserToToggleRow ? data.id : null)
            }
          >
            {columns.map((column: IColumnData, j: number) => {
              let info = data[column.dataIndex];
              return <td key={j}>{column.render(info, data)}</td>;
            })}
          </tr>
          {expandableRows.includes(data.id) &&
            data.tokens.map((token: IToken, k: number) => {
              return (
                <tr key={k} id={data.id}>
                  {columns.map((column: IColumnData, l: number) => {
                    let info: any = token[column.dataIndex as keyof IToken];
                    return <td key={l}>{column.render(info, token, k)}</td>;
                  })}
                </tr>
              );
            })}
        </React.Fragment>
      );
    });
  };

  const renderHeader = () => {
    return columns.map((val: IColumnData, i: number) => (
      <th key={i}>{val.title}</th>
    ));
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
            <AbsoluteContainer loadingContainer={true}>
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

          <StyledTableScroll fixed={true}>
            <StyledTHead fixed={true}>
              <tr>{renderHeader()}</tr>
            </StyledTHead>
            <StyledTBody>{renderRowsExpandable()}</StyledTBody>
          </StyledTableScroll>
        </Container>
      </>
    );
  }
  return (
    <>
      <Container>
        <p className="tabControls">{tableTitle}</p>

        <StyledTableScroll>
          <StyledTHead>
            <tr>{renderHeader()}</tr>
          </StyledTHead>
          <StyledTBody>{renderRows()}</StyledTBody>
        </StyledTableScroll>
      </Container>
    </>
  );
}

export default Table;
