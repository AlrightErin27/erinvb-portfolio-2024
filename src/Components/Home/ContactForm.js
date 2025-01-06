import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Contact tab */}
      <div
        className={`contact-tab ${isOpen ? "hidden" : ""}`}
        onClick={toggleForm}
      >
        CONTACT ME
      </div>

      {/* Contact form */}
      <div className={`contact-form-container ${isOpen ? "open" : ""}`}>
        <div className="contact-form">
          <h3>CONTACT ME</h3>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your Name" />
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Your Message"
            ></textarea>
            <button type="submit">Send</button>
          </form>
          <button className="close-button" onClick={toggleForm}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
