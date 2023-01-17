import { ButtonContainer, PrimaryButton } from "../reusable/Buttons";
export const SwapButton = ({ page, onClick }: { page: string; onClick: any }) =>
  // {
  //   // onClick,
  //   // currentRoute,
  //   // text,
  //   // disabled,
  //   // loading,
  // },
  {
    const handleSwapButtonClick = async () => {
      // check we have users account details then execute swap
      if (page === "selectedRoute") {
        onClick?.();
      }
      // check above user has sufficient gas etc (could be option to refuel or swap etc)
    };

    const getButtonText = () => {
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
