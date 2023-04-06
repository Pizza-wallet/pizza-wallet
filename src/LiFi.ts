import LIFI from "@lifi/sdk";

const LiFi = new LIFI({
  // apiUrl: process.env.REACT_APP_API_URL,
  // rpcs: getRpcs(),
  // defaultRouteOptions: {
  //   integrator: 'transferto.xyz',
  // },
  // Testnets are only enabled on the staging environment
  // apiUrl: "https://staging.li.quest/v1/",
});

export default LiFi;
