import React from "react";
import "./portfolio.css";
import IMG1 from "../../assets/portfolio1.jpg";


const Portfolio = () => {
  return (
    <section id="portfolio">
      {/* <h5>Portf</h5> */}
      <h2>My Recent Projects</h2>
      <div className="container portfolio__container">
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={IMG1} alt="" />
          </div>
          <h2>My Notes</h2>
          <h4>NodeJs Application</h4>
          <div className="portfolio__item-cta">
            <a
              href="https://github.com/auqib/projects"
              className="btn"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://anotes.auqib.com/"
              className="btn btn-primary"
              target="_blank"
            >
              Live DEMO
            </a>
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={IMG1} alt="" />
          </div>
          <h2>Text Editor</h2>
          <h4>React Application</h4>
         
          <div className="portfolio__item-cta">
            <a
              href="https://github.com/auqib/projects"
              className="btn"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://auqib.com/"
              className="btn btn-primary"
              target="_blank"
            >
              Live DEMO
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Portfolio;
