function Onramp() {
  return (
    <iframe
      src="https://staging-global.transak.com?apiKey=bb470ce8-11a8-42c9-a8cc-29b02b1a588d&widgetHeight=625"
      title="ramper"
      className="iframe"
      frameBorder="no"
      allow="accelerometer; autoplay; camera; gyroscope; payment;"
      style={{
        width: "450px",
        height: "690px",
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        border: "1px solid #e7eaf3",
        borderRadius: "1rem",
        marginTop: "-5em",
        // filter: "invert(90%)",
      }}
    />
  );
}

export default Onramp;
