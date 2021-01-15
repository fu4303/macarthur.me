import { useState } from 'react';

const ContactForm = () => {
  const [validationMessage, setValidationMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString()
    }).then(() => {
      setValidationMessage('Message successfully sent!');
    });
  }

  return (
    <form
      name="Contact"
      method="post"
      action="/thanks/"
      data-netlify="true"
      className="mx-auto max-w-2xl"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      style={{
        flex: "1",
      }}
    >
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      <p className="mb-4">
        <label>
          Your name:
          <br />
          <input
            required
            type="text"
            name="name"
          />
        </label>
      </p>

      <p className="mb-4">
        <label>
          Your email:
          <br />
          <input
            required
            type="email"
            name="email"
          />
        </label>
      </p>

      <p className="mb-4">
        <label>
          Message:
          <br />
          <textarea required name="message" rows={4} />
        </label>
      </p>

      <p className="mt-6">
        <button type="submit" className="button">Send</button>
      </p>

      {validationMessage && (
        <span className={""}>
          {validationMessage}
        </span>
      )}
    </form>
  )
}

export default ContactForm;
