import React from "react";
import { Modal } from "antd";
import closeIcon from "../../assets/closeIcon.svg";
import styled from "styled-components";

const Header = styled("div")`
  color: #3e389f;
  font-family: "Gloria Hallelujah", sans-serif;
  font-size: 1.5rem;
  padding: 0.625rem 0 0.625rem 0;
  -webkit-text-stroke: thin;
  margin-left: 1.875rem;
`;

const InnerContainer = styled("div")`
  border: 0.125rem solid #3e389f;
  border-radius: 2.5625rem;
  background: #f8f2ed;
`;

interface IPizzawalletModal {
  modalOpen: boolean;
  setModalOpen: (val: boolean) => void;
  width?: string;
  title: string;
  children: React.ReactNode;
}

function PizzawalletModal({
  modalOpen,
  setModalOpen,
  width,
  title,
  children,
}: IPizzawalletModal) {
  return (
    <>
      <Modal
        open={modalOpen}
        footer={null}
        width={width}
        closeIcon={
          <img
            height={20}
            width={26}
            style={{ marginRight: "1.875rem", marginTop: "1.25rem" }}
            src={closeIcon}
          />
        }
        maskStyle={{ backgroundColor: "#A4ABAEB2" }}
        onCancel={() => setModalOpen(false)}
        bodyStyle={{
          padding: "0.425rem",
        }}
      >
        <>
          <Header>{title}</Header>
          <InnerContainer>{children}</InnerContainer>
        </>
      </Modal>
    </>
  );
}

export default PizzawalletModal;
