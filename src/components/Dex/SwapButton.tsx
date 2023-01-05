import { ButtonContainer, PrimaryButton } from "../reusable/Buttons";
export const SwapButton = () =>
  // {
  //   // onClick,
  //   // currentRoute,
  //   // text,
  //   // disabled,
  //   // loading,
  // },
  {
    // hardcoded until we have authentication set up.
    const account = { isActive: false };

    const handleSwapButtonClick = async () => {
      if (!account.isActive) {
        // option to select wallet or connect
      } else {
        // onClick?.();
        // handle above function (could be option to refuel or swap etc)
      }
    };

    const getButtonText = () => {
      if (account.isActive) {
        // various options for text (refuel, swap etc)
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
