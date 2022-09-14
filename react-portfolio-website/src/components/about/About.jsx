import React from "react";
import "./about.css";
import ME from "../../assets/photo1.jpg";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
      <h5>Get to Know</h5>
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut
            voluptatibus aspernatur, quis eos obcaecati repellat veritatis id ea
            vitae laboriosam et dolorum error nulla, at saepe sint, aperiam ipsa
            architecto.
          </p>
          <a href="#contact" className="btn btn-primary">Let's Talk</a>
        </div>
      </div>
    </section>
  );
};
export default About;
