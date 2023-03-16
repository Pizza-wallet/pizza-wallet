import React, { useState } from "react";
import PizzawalletModal from "../reusable/PizzawalletModal";
import Address from "../Address/Address";
import styled from "styled-components";
import ChainSelect from "../Dex-lifi/SelectToken/ChainSelect/ChainSelect";
import { apiList } from "../../helpers/explorerApis";
import { CustomImg } from "../reusable/CustomImg";
import { LogoutButton, ButtonContainer } from "../reusable/Buttons";
import AccountLogo from "../../assets/account-logo.svg";
import { useLogout } from "../../hooks/useLogout";

const StyledP = styled(`p`)`
  font-family: Rubik;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.04em;
`;

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "7px",
    backgroundColor: "black",
    cursor: "pointer",
  },
  button: {
    height: "40px",
    padding: "0 20px",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: "0.2px",
    fontSize: "15px",
    margin: "20px 20px",
    border: "none",
    background: "black",
    color: "white",
  },
  text: {
    color: "white",
  },
  modalTitle: {
    marginBottom: "20px",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "20px",
  },
} as const;

interface WantedChain {
  chain?: number;
}

const TemporaryConnectAccount: React.FC<WantedChain> = (_props) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const { handleLogout } = useLogout();

  // const chain = props.chain !== undefined ? props.chain : chainId;

  const navigateToBlockExplorer = (chainId: number) => {
    const chain = chainId.toString();
    const blockExplorerEndpoint = apiList.find(
      (val) => val.chainId === chain,
    )?.blockExplorerEndpoint;
    window.open(blockExplorerEndpoint, "_blank");
  };

  return (
    <>
      <div>
        <CustomImg
          onClick={() => setIsAuthModalOpen(true)}
          width={"2.4375rem"}
          height={"2.4375rem"}
          margin={"0 3.125rem 0 0"}
          style={{ cursor: "pointer" }}
          src={AccountLogo}
        />

        <PizzawalletModal
          modalOpen={isAuthModalOpen}
          setModalOpen={setIsAuthModalOpen}
          width={"26.75rem"}
          title={"Account"}
        >
          <>
            <div style={{ margin: "1.25rem" }}>
              <Address avatar="left" size={4} copyable />

              <div
                style={{ margin: "3.125rem 0 1.25rem 0", textAlign: "center" }}
              >
                <StyledP>Block Explorers</StyledP>
              </div>

              <ChainSelect
                chainId={0}
                setChain={navigateToBlockExplorer}
                centerItems={true}
              />
              {/* <ConnectButton
                  label="MetaMask"
                  image={metamask_Logo}
                  onClick={async () => {
                    await metaMask.activate(getAddChainParameters(chain!));
                    window.localStorage.setItem("connectorId", "injected");
                    setIsAuthModalOpen(false);
                  }}
                /> */}
              <ButtonContainer
                width={"171px"}
                height={"51px"}
                margin={"20px auto 30px auto"}
              >
                <LogoutButton onClick={handleLogout}>Sign Out</LogoutButton>
              </ButtonContainer>
            </div>
          </>
        </PizzawalletModal>

        <br />
      </div>
    </>
  );
};

export default TemporaryConnectAccount;
