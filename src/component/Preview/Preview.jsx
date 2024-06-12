import React from "react";
import styles from "./style.module.css";
import Loader from "../Loader/Loader";
import DwnButton from "../Button/Button";
function Preview({ url, myDivRef }) {
  const shareLink = async () => {
    let shareData = {
      text: "#SecondBirthDate",
      url: url,
    };

    await navigator.share(shareData, {
      copy: true,
      email: true,
      print: true,
      sms: true,
      messenger: true,
      facebook: true,
      whatsapp: true,
      twitter: true,
      linkedin: true,
      telegram: true,
      skype: true,
      pinterest: true,
      language: "en",
    });
  };

  const shareGreetings = async () => {
    if (!navigator.canShare) {
      alert("Your browser doesn't support the Web Share");
      return;
    }
    const response = await fetch(url);
    const videoArrayBuffer = await response.arrayBuffer();
    const videoBlob = new Blob([videoArrayBuffer], { type: "video/mp4" });

    const file = new File([videoBlob], "greetings.mp4", { type: videoBlob.type });

    let shareData = {
      files: [file],
    };

    await navigator.share(shareData, {
      copy: true,
      email: true,
      print: true,
      sms: true,
      messenger: true,
      facebook: true,
      whatsapp: true,
      twitter: true,
      linkedin: true,
      telegram: true,
      skype: true,
      pinterest: true,
      language: "en",
    });
  };
  const downloadVideo = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const videoArrayBuffer = await response.arrayBuffer();
      const videoBlob = new Blob([videoArrayBuffer], { type: "video/mp4" });
      const videoBlobUrl = URL.createObjectURL(videoBlob);

      // Create a link element, set the download attribute, and trigger the download
      const link = document.createElement("a");
      link.href = videoBlobUrl;
      link.download = "video.mp4"; // You can set a dynamic filename if needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the object URL after download
      URL.revokeObjectURL(videoBlobUrl);
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };
  return (
    <div className={styles.container} ref={myDivRef}>
      <h2 className={styles.heading}>Preview</h2>
      {url ? (
        <div className={styles.main}>
          <div className={styles.left}>
            <video width="100%" height="100%" autoPlay controls>
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className={styles.right}>
            <DwnButton text="Download" onClick={downloadVideo} />
            <DwnButton text="Share Link" onClick={shareLink} />
            <DwnButton text="Share Greetings" onClick={shareGreetings} />
          </div>
        </div>
      ) : (
        <div className={styles.loaderBox}>
          <div className={styles.loadingMsg}>Generating your video...</div>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Preview;
