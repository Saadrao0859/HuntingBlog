import React, { useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone, desc);
    const data = { name, email, phone, desc };
    fetch("http://localhost:3000/api/postcontact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Thanks for contacting us!");
        setPhone("");
        setName("");
        setEmail("");
        setDesc("");
      })

      .catch((err) => {
        console.error("Error:", err);
      });
  };
  const handleChange = (e) => {
    if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "desc") {
      setDesc(e.target.value);
    }
    console.log(e, "change");
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formlabel}>
            Enter your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            className={styles.formcontrol}
            name="name"
            id="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formlabel}>
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            className={styles.formcontrol}
            name="email"
            id="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className={styles.formlabel}>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formlabel}>
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={handleChange}
            className={styles.formcontrol}
            id="phone"
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="desc" className={styles.formlabel}>
            Elaborate your concern
          </label>
          <textarea
            onChange={handleChange}
            value={desc}
            name="desc"
            className={styles.formlabel}
            placeholder="Enter your concern here"
            id="desc"
          ></textarea>
        </div>
        <button type="submit" className={styles.btnprimary}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Contact;
