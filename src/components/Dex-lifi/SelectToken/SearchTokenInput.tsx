import React from "react";
import { Input } from "antd";
const { Search } = Input;

interface ISearchTokenInput {
  setTokenSearchFilter: (x: string) => void;
}

export const SearchTokenInput = ({
  setTokenSearchFilter,
}: ISearchTokenInput) => {
  return (
    <>
      <Search
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTokenSearchFilter(e.target.value)
        }
        size={"large"}
        placeholder="Search your token"
      />
    </>
  );
};
