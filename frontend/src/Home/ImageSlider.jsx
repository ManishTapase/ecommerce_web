import React, { useEffect, useRef, useState } from "react";
import hrx from "../images/hrx.jpg";
import gadgets from "../images/gadgets.png";
import cloths from "../images/cloths.png";
const ImageSlider = () => {
  const [currInd, setCurrInd] = useState(0);
  const timerRef = useRef(null);
  const slides = [
    {
      url:hrx,
      title: "shoes",
    },
    {
      url: gadgets,
      title: "gadgets",
    },
    {
      url: cloths,
      title: "cloths",
    },
  ];
  const container = {
    justifyContent: "center",
    position: "relative",
  };
  const rightArrow = {
    position: "absolute",
    top: "50%",
    transform: "translate(0,-50%)",
    right: "2rem",
    cursor: "pointer",
    color: "red",
    zIndex: 1,
  };
  const leftArrow = {
    position: "absolute",
    top: "50%",
    transform: "translate(0,-50%)",
    left: "2rem",
    cursor: "pointer",
    color: "white",
    zIndex: 1,
  };
  const prev = () => {
    const isLastSlide = currInd === 0;
    const newIndex = isLastSlide ? slides.length - 1 : currInd - 1;
    setCurrInd(newIndex);
  };
  const next = () => {
    const isLastSlide = currInd === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currInd + 1;
    setCurrInd(newIndex);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      next();
    }, 2000);
    return () => clearTimeout(timerRef.current);
  }, [next]);
  return (
    <div>
      <span>
        <i
          className="fa-solid fa-chevron-left fa-3x"
          onClick={() => prev()}
          style={{
            color: "#f2eeee67",
            position: "absolute",
            top: "3em",
            left: "1.5em",
            zIndex: "2",
            cursor: "pointer",
          }}
        />
      </span>
      <div style={container}>
        <img
          src={`${slides[currInd].url}`}
          id="sliderimg"
        />
      </div>
      <span>
        <i
          className="fa-solid fa-chevron-right fa-3x"
          onClick={() => next()}
          style={{
            color: "#f2eeee67",
            position: "absolute",
            top: "3em",
            right: "2em",
            cursor: "pointer",
          }}
        />
      </span>
    </div>
  );
};
//#f2eeeed0

export default ImageSlider;
