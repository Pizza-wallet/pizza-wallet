function DEX() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <iframe
        src="https://transferto.xyz/embed"
        title="lifi"
        className="iframe"
        frameBorder="no"
        style={{
          width: "450px",
          height: "690px",
          boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
          border: "1px solid #e7eaf3",
          background: "white",
          borderRadius: "1rem",
          marginTop: "-5em",
        }}
      />
    </div>
  );
}

export default DEX;
