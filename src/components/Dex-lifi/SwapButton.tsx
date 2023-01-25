import { ButtonContainer, PrimaryButton } from "../reusable/Buttons";
import { RouteExecutionStatus, hasEnumFlag } from "../../stores";
import { Spin } from "antd";

interface ISwapButton {
  page: string;
  onClick: (x: string) => void;
  statusOfSwap?: number;
  navigateBack: () => void;
}

export const SwapButton = ({
  page,
  onClick,
  statusOfSwap,
  navigateBack,
}: ISwapButton) => {
  const handleSwapButtonClick = async () => {
    // check we have users account details then execute swap
    if (statusOfSwap && hasEnumFlag(statusOfSwap, RouteExecutionStatus.Done)) {
      navigateBack();
    }
    if (
      statusOfSwap &&
      hasEnumFlag(statusOfSwap, RouteExecutionStatus.Pending)
    ) {
      return;
    }
    if (page === "selectedRoute") {
      onClick?.("swap");
    }
    // check above user has sufficient gas etc (could be option to refuel or swap etc)
  };

  const getButtonText = () => {
    if (statusOfSwap && hasEnumFlag(statusOfSwap, RouteExecutionStatus.Done)) {
      return "Done";
    }
    if (
      statusOfSwap &&
      hasEnumFlag(statusOfSwap, RouteExecutionStatus.Pending)
    ) {
      return (
        <>
          <Spin
            size="large"
            style={{ color: "#3e389f", marginRight: "5px" }}
          ></Spin>{" "}
          Pending
        </>
      );
    }
    if (page === "selectedRoute") {
      return "Start swap";
    } else if (page === "main") {
      return "Swap";
    }
    return "Connect wallet";
  };

  return (
    <ButtonContainer
      width={"14.375rem"}
      height={"3.1875rem"}
      margin={"2.25rem auto 2.25rem auto"}
    >
      <PrimaryButton onClick={handleSwapButtonClick}>
        {getButtonText()}
      </PrimaryButton>
    </ButtonContainer>
  );
};
