import React from "react";
import "./about.css";
import ME from "../../assets/photo1.jpg";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
      {/* <h5>Get to Know</h5> */}
      <h2>About Me</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="my image" />
          </div>
         
         
        </div>
        <div className="about__content">
        <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>1 Year Industry Experience</small>
            </article>
            <article className="about__card">
              <FiUsers className="about__icon" />
              <h5>Clients</h5>
              <small>Worked with a number of clients</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>More then 20+ projects completed</small>
            </article>
          </div>
           
          <p>
          Strategic Software Developer skilled in application development, with gift for prioritizing and managing several 
milestones of various projects simultaneously. Talented at code writing, using version control systems. Smart 
Programmer with fantastic programming skills. Committed to maintaining professionalism and creating innovative 
programs. 

          </p>
          <a href="#contact" className="btn btn-primary">Contact Me</a>
        </div>
      </div>
    </section>
  );
};
export default About;
