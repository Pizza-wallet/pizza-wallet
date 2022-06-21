import { Button, Card } from "antd";
import Text from "antd/lib/typography/Text";
// import { ArrowDownOutlined } from "@ant-design/icons";
// import { useOneInchQuote } from "react-moralis";

const styles = {
  card: {
    width: "430px",
    backgroundColor: "rgba(14, 13, 13, 0.3)",
    border: "none",
    borderRadius: "1rem",
    fontSize: "16px",
    fontWeight: "400",
    justifyContent: "center",
  },
  button: {
    height: "3em",
    marginTop: "1em",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1em",
    backgroundImage: "linear-gradient(90deg, #0364ff, #1eb7ef)",
    cursor: "pointer",
  },
};

function Bridge() {
  return (
    <>
      <Card style={styles.card} bodyStyle={{ padding: "18px" }}>
        <Text>
          The Pizza Wallet Bridge is still in an experimental stage and hence is
          being developed in isolation from the rest of the project.
          <br />
          Click the button below to visit the Bridge.
        </Text>
        <Button
          style={styles.button}
          type="primary"
          href="https://pizza-bridge.on.fleek.co/"
          target="blank"
          rel="noopener noreferrer"
        >
          Bridge
        </Button>
      </Card>
    </>
  );
}

export default Bridge;
