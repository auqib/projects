import React from "react";
import "./portfolio.css";
import IMG1 from "../../assets/icons8-chat-96.png";
import IMG2 from "../../assets/icons8-right-handed-96.png";
import IMG3 from "../../assets/icons8-libre-office-writer-96.png";

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
          <h2>aChat</h2>
          <h4>Chat Application using MERN Stack</h4>
          <div className="portfolio__item-cta">
            <a
              href="https://github.com/auqib/projects"
              className="btn"
              target="_blank"
            >
              Github
            </a>
            <a
              href="https://achat.auqib.com/"
              className="btn btn-primary"
              target="_blank"
            >
              Live DEMO
            </a>
          </div>
        </article>
        <article className="portfolio__item">
          <div className="portfolio__item-image">
            <img src={IMG2} alt="" />
          </div>
          <h2>aNotes</h2>
          <h4>Notes Taking Application using React</h4>
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
            <img src={IMG3} alt="" />
          </div>
          <h2>aEditor</h2>
          <h4>Word Editor Application using React</h4>

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
