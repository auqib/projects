import React, { useRef, useState } from "react";
import "./header.css";
import CTA from "./CTA";
import ME from "../../assets/photo.png";
import HeaderSocials from "./HeaderSocials";
import DecodeAnimation from "react-decode-animation";
import { TypeAnimation } from "react-type-animation";
import { disablePageScroll, enablePageScroll, getScrollState,clearQueueScrollLocks  } from 'scroll-lock';

const Header = () => {
  const ref = useRef(null);
  const [typingStatus, setTypingStatus] = useState('Initializing');
  const [decodeState, setDecodeState] = useState("Reset")
  const changecolor =()=>{
    document.body.style.backgroundColor = "#1f1f38 "
  }


  // disablePageScroll();
  
 
  return (
    <header>
      
      
      <div className="container header__container">
        <h2>Hello I'm</h2>
       
        <span className="highlighted-text">
              <DecodeAnimation
                state={decodeState}
                text={"Auqib Nazir"}
                autoplay
              />
            </span>
            <TypeAnimation
sequence={[
      1500,
      () => {
        setTypingStatus('Typing...');
        
        
      
      },
      'I am a Full Stack Developer, I can do whatever I want on this website 😎 ',
      () => {
       setTypingStatus('Done Typing');
       
      },
      500,
      () => {
        setTypingStatus('Deleting...');
      },
      '',
      () => {
        setTypingStatus('Done Deleting');
      },
       1000,
      () => {
        setTypingStatus('Scroll Down to know more about me 👇');
        setDecodeState("Playing");
        // clearQueueScrollLocks();
        // enablePageScroll();
        changecolor();
        
        
      },
      
     ]}
    speed={30}
    wrapper="h3"
    repeat={0}
    cursor= {1}
  />

       <h6>{typingStatus}</h6> 
        
        {/* <CTA />
        <HeaderSocials />
        <div className="me">
          <img src={ME} alt="my photo" />
        </div>
        <a href="#contacts" className="scroll__down">
          Scroll Down
        </a> */}
      </div>
    </header>
  );
};

export default Header;
