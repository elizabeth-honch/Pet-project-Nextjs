import { useState, useEffect } from "react";
import styles from './styles.module.css';
import clsx from 'clsx';
import Notification from "../notification";

export default function ContactForm() {
  const [emailValue, setEmailValue] = useState();
  const [nameValue, setNameValue] = useState();
  const [msgValue, setMsgValue] = useState();
  const [notificationData, setNotificationData] = useState();

  useEffect(() => {
    if (
      notificationData?.status === 'success' ||
      notificationData?.status === 'error'
    ) {
      const timer = setTimeout(() => {
        setNotificationData(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [notificationData]);

  async function sendContactData(contact) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong')
    }
  };

  async function handleSubmitForm(e) {
    e.preventDefault();
    setNotificationData({
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way',
    });

    const dataToBack = {
      email: emailValue,
      name: nameValue,
      msg: msgValue,
    };

    try {
      await sendContactData(dataToBack);
      setNotificationData({
        status: 'success',
        title: 'Success send message!',
        message: 'Your message successfully sended!',
      });
      setEmailValue('');
      setNameValue('');
      setMsgValue('');
    } catch(error) {
      setNotificationData({
        status: 'error',
        title: 'Error message.',
        message: `${error?.message || 'Your message was not sended!'}`,
      });
    }
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmitForm}
      >
        <div className={styles.formItem}>
          <label>Your Email</label>
          <input
            type="email"
            name="email"
            value={emailValue}
            onChange={({target}) => setEmailValue(target.value)}
          />
        </div>
        <div className={styles.formItem}>
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            value={nameValue}
            onChange={({target}) => setNameValue(target.value)}
          />
        </div>
        <div className={clsx(styles.formTextarea, styles.formItem)}>
          <label>Your Message</label>
          <textarea
            type="msg"
            name="msg"
            value={msgValue}
            onChange={({target}) => setMsgValue(target.value)}
          />
        </div>

        <div className={styles.formBlock}>
          <button className="submitBtn">Send Message</button>
        </div>
      </form>

      {notificationData && (
        <Notification {...notificationData} />
      )}
    </>
  );
};
