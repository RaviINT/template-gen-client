import React from "react";
import styles from "./style.module.css";

import { Carousel } from "react-responsive-carousel";
function VideoTemplate({ templateList, handleCarosoulChange }) {
  return (
    <div className={styles.container}>
      <Carousel className={styles.Carousel} showIndicators={false} onChange={handleCarosoulChange}>
        {templateList.map((item, index) => (
          <div key={index} className={styles.videoBox}>
            <video width="100%" height="100%" autoPlay muted>
              <source src={item} type="video/mp4" width="100%" height="100%" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default VideoTemplate;
