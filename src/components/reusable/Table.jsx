import { useState } from "react";
import styled from "styled-components";
import { SecondaryButton } from "./Buttons";
import { Link } from "react-router-dom";

const Container = styled("div")`
  width: 100%;
  padding: 20px 15px 20px 15px;
  background-color: #f8f2ed;
  border-radius: 44px;
  position: relative;
  overflow-x: auto;
`;
const Container2 = styled("div")`
  width: 100%;
  padding: 20px 15px 20px 15px;
  background-color: #f8f2ed;
  border-radius: 44px;
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
  width: 239px;
  height: 57px;
`;

function Table({ tableData, columns, tableTitle, expandableRow }) {
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
    return tableData.map((data) => {
      return (
        <>
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
        </>
      );
    });
  };

  const renderHeader = () => {
    return columns.map((val, i) => <th key={i}>{val.title}</th>);
  };

  if (!tableData)
    return (
      <>
        <Container3>
          <Container2>
            <p className="tabControls">{tableTitle}</p>
            <table style={{ width: "100%", height: "100%", opcaity: "0.5" }}>
              <thead>
                <tr>{renderHeader()}</tr>
              </thead>
              <tr style={{ height: "250px" }}></tr>
            </table>
          </Container2>
          <ButtonContainer>
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
  else if (expandableRow) {
    return (
      <>
        <Container>
          <p className="tabControls">{tableTitle}</p>

          <table style={{ width: "100%" }}>
            <thead>
              <tr>{renderHeader()}</tr>
            </thead>
            {renderRowsExpandable()}
          </table>
        </Container>
      </>
    );
  }
  return (
    <>
      <Container>
        <p className="tabControls">{tableTitle}</p>

        <table style={{ width: "100%" }}>
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          {renderRows()}
        </table>
      </Container>
    </>
  );
}

export default Table;
