// import React, { useState, useEffect } from "react";
// import { useMoralis } from "react-moralis";

function Ramper() {
//   const [ramper, setRamper] = useState();
//   const { Moralis } = useMoralis();
//   useEffect(() => {
//     if (!Moralis?.["Plugins"]?.["fiat"]) return null;
//     async function initPlugin() {
//       Moralis.Plugins.fiat
//         .buy({ defaultCrypto=ETH }, { disableTriggers: true })
//         .then((data) => setRamper(data.data));
//     }
//     initPlugin();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [Moralis.Plugins]);

  return (
    <iframe
      src="https://widget.onramper.com?defaultCrypto=ETH&apiKey=pk_test_x5M_5fdXzn1fxK04seu0JgFjGsu7CH8lOvS9xZWzuSM0"
      title="ramper"
      frameBorder="no"
      allow="accelerometer; autoplay; camera; gyroscope; payment;"
      style={{
        width: "420px",
        height: "625px",
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        border: "1px solid #e7eaf3",
        borderRadius: "1rem",
        color: "black",
      }}
    />
  );
}

export default Ramper;
