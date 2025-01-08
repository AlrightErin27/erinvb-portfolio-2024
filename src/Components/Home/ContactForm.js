import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [eMail, setEMail] = useState("");
  const [message, setMessage] = useState("");
  const [finishedForm, setFinishedForm] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const validateForm = (name, eMail, message) => {
    const isNameValid = name.trim().length > 0;
    const isMessageValid = message.trim().length >= 3;
    const isEmailValid =
      eMail.trim() === "" || (eMail.includes("@") && eMail.endsWith(".com"));

    console.log(
      `Validation: Name=${isNameValid}, Email=${isEmailValid}, Message=${isMessageValid}`
    );

    return isNameValid && isMessageValid && isEmailValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Input changed: ${name} = ${value}`);
    if (name === "name") {
      setName(value);
    } else if (name === "eMail") {
      setEMail(value);
    } else if (name === "message") {
      setMessage(value);
    }

    // Update finishedForm based on validation
    setFinishedForm(
      validateForm(
        name === "name" ? value : name,
        name === "eMail" ? value : eMail,
        name === "message" ? value : message
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm(name, eMail, message);
    setFinishedForm(isValid);

    if (!isValid) {
      const errorMessages = [];
      if (name.trim().length === 0) {
        errorMessages.push("Name is required and cannot be empty.");
      }
      if (message.trim().length < 3) {
        errorMessages.push("Message must be at least 3 characters long.");
      }
      if (
        eMail.trim() !== "" &&
        (!eMail.includes("@") || !eMail.endsWith(".com"))
      ) {
        errorMessages.push(
          "Email must contain an '@' and end with '.com' if provided."
        );
      }

      alert(
        `Cannot send the message for the following reasons:\n- ${errorMessages.join(
          "\n- "
        )}`
      );
    } else {
      // console.log("Form Submitted Successfully:", { name, eMail, message });
      alert("Your message has been sent!");
    }
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <label htmlFor="eMail">E-mail:</label>
            <input
              type="text"
              id="eMail"
              name="eMail"
              value={eMail}
              onChange={handleInputChange}
            />
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={message}
              onChange={handleInputChange}
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
