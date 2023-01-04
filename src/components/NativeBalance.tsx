import { Spin } from "antd";
import { useMoralis } from "react-moralis";

function NativeBalance(props: { totalBalance: string }) {
  const { account, isAuthenticated } = useMoralis();
  const isLoading = !props.totalBalance;
  if (!account || !isAuthenticated) return null;
  if (isLoading)
    return (
      <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
        <Spin style={{ color: "#3e389f" }}></Spin>
      </div>
    );
  return (
    <div
      style={{
        textAlign: "center",
        whiteSpace: "nowrap",
        color: "#3E389F",
        fontSize: "1.75rem",
        marginTop: "1.25rem",
        fontWeight: "bold",
      }}
    >
      ${props.totalBalance}
    </div>
  );
}

export default NativeBalance;
