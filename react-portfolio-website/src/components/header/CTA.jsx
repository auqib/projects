import React from "react";
import CV from "../../assets/Resume_Auqib_Nazir.pdf";

const CTA = () => {
  return (
    <div id="contact_button" className="cta">
      <a href={CV} download className="btn">
        Download CV
      </a>
      <a href="#contact" className="btn btn-primary">
        Contact Me
      </a>
    </div>
  );
};

export default CTA;
