import React from "react";

const Footer = () => {
  return (
    <>
      <div
        style={{
          position:"relative",
          backgroundColor: "#263150",
          height: "15em",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#22ae0f",
            fontFamily: "'Roboto Condensed', sans-serif ",
            fontSize: "medium",
          }}
        >
          © 2023 - {new Date().getFullYear()} | Built with | contact us |
          myShop.com | cloths | electronics | shoes
          {` `}
        </span>
      </div>
    </>
  );
};

export default Footer;
