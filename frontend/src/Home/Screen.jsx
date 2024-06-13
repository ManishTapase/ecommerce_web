import React from "react";
import ImageSlider from "./ImageSlider";
const Screen = () => {
  const container = {
    position:"relative",
    top:"4em",
    height: "70vh",
    width: "100vw",
  };
  return (
    <div style={container}>

      <ImageSlider />
    </div>
  );
};

export default Screen;
