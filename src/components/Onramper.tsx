function Onramper() {
  return (
    <iframe
      style={{
        borderRadius: "10px",
        boxShadow: "0 2px 10px 0 rgba(0,0,0,.20)",
        margin: "auto",
        maxWidth: "420px",
      }}
      src="https://widget.onramper.com?color=266677&apiKey=pk_test_X1pZ0ITJMHaxvZKyDICEXDKoX08XuhYqQtzONKDaeTo0"
      height="660px"
      width="482px"
      title="Onramper"
      frameBorder="0"
      allow="accelerometer; autoplay; camera; gyroscope; payment"
    ></iframe>
  );
}

export default Onramper;
