// import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled("div")`
  width: 100%;
  padding: 20px 15px 20px 15px;
  background-color: #fff5ce;
  border-radius: 44px;
  position: relative;
`;

function Table({ tableData, headerData }) {
  // useEffect(() => {
  //   // set table state
  // }, []);

  const renderRows = () => {
    return tableData.map((val, i) => {
      return (
        <tr key={i}>
          {val.map((table, j) => {
            return <td key={j}>{table}</td>;
          })}
        </tr>
      );
    });
  };

  const renderHeader = () => {
    return headerData.map((val) => <th>{val}</th>);
  };

  return (
    <>
      <Container>
        <p className="tabControls">Token</p>
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
