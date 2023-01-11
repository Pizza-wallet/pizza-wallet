import { Input } from "antd";
const { Search } = Input;

export const SearchTokenInput = () => {
  return (
    <>
      <Search size={"large"} placeholder="Search your token" />
    </>
  );
};
