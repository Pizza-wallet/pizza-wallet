import { Input } from "antd";
const { Search } = Input;

interface ISearchTokenInput {
  setTokenSearchFilter: any;
}

export const SearchTokenInput = ({
  setTokenSearchFilter,
}: ISearchTokenInput) => {
  return (
    <>
      <Search
        onChange={(e) => setTokenSearchFilter(e.target.value)}
        size={"large"}
        placeholder="Search your token"
      />
    </>
  );
};
