import React from "react";
import { Modal } from "antd";

interface IPizzawalletModal {
  modalOpen: boolean;
  setModalOpen: (val: boolean) => void;
  width?: string;
  children: React.ReactNode;
}

function PizzawalletModal({
  modalOpen,
  setModalOpen,
  width,
  children,
}: IPizzawalletModal) {
  return (
    <>
      <Modal
        visible={modalOpen}
        footer={null}
        width={width}
        maskStyle={{ backgroundColor: "#A4ABAEB2" }}
        onCancel={() => setModalOpen(false)}
        bodyStyle={{
          padding: "0.425rem",
          fontSize: "17px",
          fontWeight: "500",
        }}
      >
        {children}
      </Modal>
    </>
  );
}

export default PizzawalletModal;
