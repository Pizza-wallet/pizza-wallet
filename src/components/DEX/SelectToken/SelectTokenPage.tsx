import type { FC } from "react";
import { ChainSelect } from "./ChainSelect";
import { TokenList } from "./TokenList";
import { SearchTokenInput } from "./SearchTokenInput";

interface ISelectTokenPage {
  formType: string;
  navigateBack: any;
}

export const SelectTokenPage: FC<ISelectTokenPage> = ({
  formType,
  navigateBack,
}) => {
  return (
    <>
      <div>
        <ChainSelect />
        <SearchTokenInput />
      </div>
      <TokenList navigateBack={navigateBack} formType={formType} />
    </>
  );
};
