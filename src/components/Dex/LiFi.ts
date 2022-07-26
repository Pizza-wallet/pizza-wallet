import LIFI from "@lifi/sdk";

const LiFi = new LIFI({
  // Testnets are only enabled on the staging environment
  apiUrl: "https://staging.li.quest/v1/",
});

export default LiFi;
