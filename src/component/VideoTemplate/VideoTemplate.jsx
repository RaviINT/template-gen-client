import React from "react";
import styles from "./style.module.css";

import { Carousel } from "react-responsive-carousel";
function VideoTemplate({ templateList,handleCarosoulChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        Select <br /> Video <br /> Template
      </div>
      <div className={styles.right}>
        <Carousel className={styles.Carousel} infiniteLoop onChange={handleCarosoulChange}>
          {templateList.map((item, index) => (
            <div key={index} className={styles.videoBox}>
              <video width="100%" height="100%" autoPlay>
                <source src={item} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default VideoTemplate;
