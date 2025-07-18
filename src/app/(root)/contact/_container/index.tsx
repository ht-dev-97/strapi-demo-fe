import React from "react";
import ContactForm from "../_components/contact-form";

const ContactContainer = () => {
  return (
    <div className="mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <ContactForm />
    </div>
  );
};

export default ContactContainer;
