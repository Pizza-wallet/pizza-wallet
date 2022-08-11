import Transfer from "./components/Transfer";
import NativeBalance from "../NativeBalance";
import Address from "../Address/Address";
import Blockie from "../Blockie";
import { Card } from "antd";

// TODO: We can use this component for our new wallet implementation or delete it and start over.
const styles = {
  title: {
    fontSize: "30px",
    fontWeight: "600",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  card: {
    // boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "none",
    borderRadius: "1rem",
    width: "450px",
    fontSize: "16px",
    fontWeight: "500",
    marginTop: "-3em",
    marginRight: "auto",
    marginLeft: "auto",
  },
};

function Wallet() {
  return (
    <Card
      className="floater"
      style={styles.card}
      title={
        <div style={styles.header}>
          <Blockie scale={5} avatar currentWallet style />
          <Address size="6" copyable />
          <NativeBalance />
        </div>
      }
    >
      <Transfer />
    </Card>
  );
}

export default Wallet;
