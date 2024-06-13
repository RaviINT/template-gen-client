import React, { useState } from "react";
import styles from "./style.module.css";
import { Carousel } from "react-responsive-carousel";
function ImageTemplate({ templateList, handleCarosoulChange, imageTemplateIndex, values }) {
  return (
    <div className={styles.container}>
      <Carousel showThumbs={false} className={styles.Carousel} showIndicators={false} infiniteLoop onChange={handleCarosoulChange}>
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
                On National Doctor's Day, I, {values.userName} want to dedicate my #SecondBirthDate {values.date} to Dr. {values.doctorName} for giving
                me a second chance at life. You helped me overcome my health challenge, and for that, I will be forever grateful. Happy Doctor's Day!
                Your dedication and care mean the world to me.
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
  );
}

export default ImageTemplate;
