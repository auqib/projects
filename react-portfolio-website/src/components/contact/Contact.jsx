import React from "react";
import "./contact.css";
import { MdOutlineEmail } from "react-icons/md";
import { BsLinkedin } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { useRef } from 'react';
import emailjs from 'emailjs-com';
const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_lo5rjt5', 'template_q0uddif', form.current, '3DrsFisYfAeTRb-tf')
    e.target.reset()
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <section id="contact">
      {/* <h5>Get In Touch</h5> */}
      <h2>Contact Me</h2>
      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail className="contact__option-icon" />
            <h4>Email</h4>
            <h5>auqib@yahoo.com</h5>
            <a href="mailto:auqib@yahoo.com" target="_blank">
              Send a message
            </a>
          </article>
          <article className="contact__option">
            <BsLinkedin className="contact__option-icon"/>
            <h4>LinkedIn</h4>
            <h5>Auqib Nazir</h5>

            <a href="https://www.linkedin.com/in/auqib/" target="_blank">
              Send a message
            </a>
          </article>
          <article className="contact__option">
            <BsWhatsapp className="contact__option-icon" />
            <h4>WhatsApp</h4>
            <h5>+61-410640296</h5>
            <a
              href="https://api.whatsapp.com/send?phone=61410640296"
              target="_blank"
            >
              Send a message
            </a>
          </article>
        </div>

        {/* end of contact options */}
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            required
          />
          <input type="email" name="email" placeholder="Your email" required />
          <textarea
            name="message"
            rows="7"
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit" className="btn btn-primary" id="contact_btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
