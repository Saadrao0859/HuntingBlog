// import React, { useState } from "react";
// import styles from "../styles/Contact.module.css";

// const Contact = () => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = { name, email, phone, desc };
//     fetch("http://localhost:3000/api/postcontact", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         alert("Thanks for contacting us!");
//         setPhone("");
//         setName("");
//         setEmail("");
//         setDesc("");
//       })

//       .catch((err) => {
//         console.error("Error:", err);
//       });
//   };
//   const handleChange = (e) => {
//     if (e.target.name == "phone") {
//       setPhone(e.target.value);
//     } else if (e.target.name == "name") {
//       setName(e.target.value);
//     } else if (e.target.name == "email") {
//       setEmail(e.target.value);
//     } else if (e.target.name == "desc") {
//       setDesc(e.target.value);
//     }
//   };
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [desc, setDesc] = useState("");
//   return (
//     <div className={styles.container}>
//       <h1>Contact Us</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.mb3}>
//           <label htmlFor="name" className={styles.formlabel}>
//             Enter your Name
//           </label>
//           <input
//             type="text"
//             value={name}
//             onChange={handleChange}
//             className={styles.formcontrol}
//             name="name"
//             id="name"
//             aria-describedby="emailHelp"
//           />
//         </div>
//         <div className={styles.mb3}>
//           <label htmlFor="email" className={styles.formlabel}>
//             Email address
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={handleChange}
//             className={styles.formcontrol}
//             name="email"
//             id="email"
//             aria-describedby="emailHelp"
//           />
//           <div id="emailHelp" className={styles.formlabel}>
//             We'll never share your email with anyone else.
//           </div>
//         </div>
//         <div className={styles.mb3}>
//           <label htmlFor="phone" className={styles.formlabel}>
//             Phone
//           </label>
//           <input
//             type="tel"
//             name="phone"
//             value={phone}
//             onChange={handleChange}
//             className={styles.formcontrol}
//             id="phone"
//           />
//         </div>
//         <div className={styles.mb3}>
//           <label htmlFor="desc" className={styles.formlabel}>
//             Elaborate your concern
//           </label>
//           <textarea
//             onChange={handleChange}
//             value={desc}
//             name="desc"
//             className={styles.formlabel}
//             placeholder="Enter your concern here"
//             id="desc"
//           ></textarea>
//         </div>
//         <button type="submit" className={styles.btnprimary}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };
// export default Contact;

import React, { useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    desc: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.desc) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/postcontact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Thanks for contacting us! We will get back to you soon.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          desc: "",
        });
      } else {
        setError(data.message || "Error submitting form. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formlabel}>
            Enter your Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={styles.formcontrol}
            name="name"
            id="name"
            required
          />
        </div>

        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formlabel}>
            Email address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.formcontrol}
            name="email"
            id="email"
            required
          />
          <div id="emailHelp" className={styles.formtext}>
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formlabel}>
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.formcontrol}
            id="phone"
          />
        </div>

        <div className={styles.mb3}>
          <label htmlFor="desc" className={styles.formlabel}>
            Elaborate your concern *
          </label>
          <textarea
            onChange={handleChange}
            value={formData.desc}
            name="desc"
            className={styles.textarea}
            placeholder="Enter your concern here"
            id="desc"
            rows="5"
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.btnprimary} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
