'use client';

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from './styles.module.css';
import Notification from "@/components/notification";

export default function ProductInfo({ product }) {
  const {id, group, name, image, description, price} = product;
  const [prName, setPrName] = useState(name);
  const [prDescription, setPrDescription] = useState(description);
  const [prPrice, setPrPrice] = useState(price);
  const [pickedImg, setPickedImg] = useState();
  const [notificationData, setNotificationData] = useState();
  const [updatedData, setUpdatedData] = useState(null);

  const inputFileRef = useRef();

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

  function handleClickFile() {
    inputFileRef.current.click();
  };

  function handleImgChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImg(fileReader.result)
    };
  
    fileReader.readAsDataURL(file);
  };

  async function getNewProduct() {
    const res = await fetch(`/api/${id}`);
    const data = await res.json();
    setUpdatedData(data?.product);
  }

  async function updateProductById(updatedProduct) {
    const res = await fetch('/api/products', {
      method: 'PUT',
      body: JSON.stringify(updatedProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong')
    }
  };

  async function handleUpdateProduct (e) {
    e.preventDefault();

    setNotificationData({
      status: 'pending',
      title: 'Update data...',
      message: 'New data are updating',
    });

    const dataToBack = {
      id: id,
      group: group,
      name: prName,
      image: pickedImg ? pickedImg : image,
      description: prDescription,
      price: prPrice,
      price_str: `$${(+prPrice).toFixed(2)}`
    };

    try {
      await updateProductById(dataToBack);
      setNotificationData({
        status: 'success',
        title: 'Success updated data!',
        message: 'Product was successfully updated!',
      });
      setPickedImg('');
      getNewProduct();
    } catch(error) {
      setNotificationData({
        status: 'error',
        title: 'Error updated data.',
        message: `${error?.message || 'New data were not sended!'}`,
      });
    }
  };

  return (
    <div className={styles.info}>
      <Image
        width={400}
        height={450}
        src={updatedData ? updatedData?.image : image}
        alt={name}
      />

      <form className={styles.form} onSubmit={handleUpdateProduct}>
        <div className={styles.formItem}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={prName}
            onChange={({ target }) => setPrName(target.value)}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={prDescription}
            onChange={({ target }) => setPrDescription(target.value)}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            value={prPrice}
            step="1"
            onChange={({ target }) => setPrPrice(target.value)}
          />
        </div>

        <div className={styles.formItem}>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
            className={styles.dNone}
            ref={inputFileRef}
            onChange={handleImgChange}
          />

          <div className={styles.previewBlock}>
            {!pickedImg && (
              <div className={styles.emptyPreview}>
                No image picked yet.
              </div>
            )}
            {pickedImg && (
              <Image
                src={pickedImg}
                alt="New image from user"
                width={120}
                height={120}
              />
            )}
            <button
              type="button"
              className="pickBtn"
              onClick={handleClickFile}
            >
              Pick an Image
            </button>
          </div>
        </div>

        <div className={styles.formBlock}>
          <button className="submitBtn">Update</button>
        </div>
      </form>

      {notificationData && (
        <Notification {...notificationData} />
      )}
    </div>
  );
};
