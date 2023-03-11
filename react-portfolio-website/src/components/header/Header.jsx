import React, { useRef, useState } from "react";
import "./header.css";
import CTA from "./CTA";
import ME from "../../assets/photo.png";
import HeaderSocials from "./HeaderSocials";
import { TypeAnimation } from "react-type-animation";
import MovingText from "react-moving-text";

const Header = () => {
  const [typingStatus, setTypingStatus] = useState("Initializing");

  const changecolor = () => {
    document.body.style.backgroundColor = "#1f1f38";
    document.body.style.overflow = "visible";
    document.getElementById("contact_button").style.display = "flex";
    document.getElementById("nav_buttons").style.display = "flex";
   
    
  };

  return (
    <header>
      <div className="container header__container">
        <h2>Hello I'm</h2>

        <span className="highlighted-text">
          <MovingText
            type="blur"
            duration="2000ms"
            delay="0s"
            direction="reverse"
            timing="ease"
            iteration="1"
            fillMode="none"
          >
            Auqib Nazir
          </MovingText>
        </span>
        <div className="text_animation">
          <TypeAnimation
            sequence={[
              1500,
              () => {
                setTypingStatus("Typing...");
              },
              "I am a Full Stack Developer, I like making Web Applications 😎 ",
              () => {
                setTypingStatus("");
              },
              500,
              () => {
                setTypingStatus("");
              },
              "",
              () => {
                setTypingStatus("");
              },
              1000,
              () => {
                setTypingStatus("Scroll Down to know more about me 👇");

                changecolor();
              },
            ]}
            speed={30}
            wrapper="h3"
            repeat={0}
            cursor={1}
          />
        </div>
        <span></span>
        <div className="typing">{typingStatus}</div>

        <CTA />
      </div>
    </header>
  );
};

export default Header;
