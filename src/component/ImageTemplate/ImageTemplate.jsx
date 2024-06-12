import React, { useState } from "react";
import styles from "./style.module.css";
import { Carousel } from "react-responsive-carousel";
function ImageTemplate({ templateList, handleCarosoulChange, imageTemplateIndex, handleSubmit }) {
  const today = new Date();
  const defaultValue = new Date(today).toISOString().split("T")[0];
  
  const [values, setValues] = useState({
    doctorName: "",
    userName: "",
    date: defaultValue,
    doctorImage: null,
    userImage: null,
  });
  console.log("🚀  values:", values);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setValues({
      ...values,
      [name]: files[0],
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(values);
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Carousel showThumbs={false} className={styles.Carousel} infiniteLoop onChange={handleCarosoulChange}>
          {templateList.map((item, index) => (
            <div id={`my-node-${imageTemplateIndex}`} key={index} className={styles.box}>
              <img src={item} alt="" width="100%" className={styles.img} crossOrigin="anonymous" />
              <div className={styles.detailsBox}>
                <img
                  src={values.doctorImage ? URL.createObjectURL(values.doctorImage) : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt=""
                  className={styles.doctorImage}
                />
                <div className={styles.heading}>#Doctor'sDay</div>
                <div className={styles.text}>
                  On National Doctor's Day, I {values.userName} want to dedicate my #SecondBirthDate {values.date} to Dr. {values.doctorName} for
                  giving me a second chance at life. You helped me overcome my health challenge, and for that, I will be forever grateful. Happy
                  Doctor's Day! Your dedication and care mean the world to me.
                </div>
                <img
                  src={values.userImage ? URL.createObjectURL(values.userImage) : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt=""
                  className={styles.userImage}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.right}>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.inputBox}>
            <div>Doctor's Name:</div>
            <input required type="text" name="doctorName" value={values.doctorName} onChange={handleChange} />
          </div>

          <div className={styles.inputBox}>
            <div>Your Name:</div>
            <input required type="text" name="userName" value={values.userName} onChange={handleChange} />
          </div>

          <div className={styles.inputBox}>
            <div>Date:</div>
            <input required type="date" name="date" value={values.date} onChange={handleChange} />
          </div>

          <div className={styles.inputBox}>
            <div>Doctor's Image:</div>
            <input required type="file" name="doctorImage" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className={styles.inputBox}>
            <div>Your Image:</div>
            <input required type="file" name="userImage" accept="image/*" onChange={handleFileChange} />
          </div>

          <button className={styles.btn} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ImageTemplate;
