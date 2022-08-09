// import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Spin } from "antd";

const Container = styled("div")`
  width: 100%;
  padding: 20px 15px 20px 15px;
  background-color: #fff5ce;
  border-radius: 44px;
  position: relative;
`;

function Table({ tableData, columns, tableTitle }) {
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

  const renderHeader = () => {
    return columns.map((val, i) => <th key={i}>{val.title}</th>);
  };

  if (!tableData) {
    return <Spin></Spin>;
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
