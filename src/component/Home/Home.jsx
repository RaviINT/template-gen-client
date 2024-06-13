import React, { useEffect, useRef, useState } from "react";
import VideoTemplate from "../VideoTemplate/VideoTemplate";
import ImageTemplate from "../ImageTemplate/ImageTemplate";
import axios from "axios";
import config from "../../utils/config";
import html2canvas from "html2canvas";
import Preview from "../Preview/Preview";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../LoadingModal/LoadingModal";
import styles from "./style.module.css";
function Home() {
  const navigate = useNavigate();
  const [videoTemplateList, setVideoTemplateList] = useState([]);
  console.log("🚀  videoTemplateList:", videoTemplateList[0]);
  const [imageTemplateList, setImageTemplateList] = useState([]);
  const [videoTemplateIndex, setVideoTemplateIndex] = useState(0);
  console.log("🚀  videoTemplateIndex:", videoTemplateIndex);
  const [imageTemplateIndex, setImageTemplateIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchVideoTemplate = async () => {
    const res = await axios(`${config.baseUrl}/getVideoTemplate`);
    if (res.status == 200) {
      setVideoTemplateList(res.data);
    }
  };
  const fetchImageTemplate = async () => {
    const res = await axios(`${config.baseUrl}/getImageTemplate`);
    if (res.status == 200) {
      setImageTemplateList(res.data);
    }
  };

  const handleVideoCarosoulChange = (index) => {
    setVideoTemplateIndex(index);
  };
  const handleImageCarosoulChange = (index) => {
    setImageTemplateIndex(index);
  };

  const handleSubmit = async (values) => {
    setModalIsOpen(true);
    let node = document.getElementById(`my-node-${imageTemplateIndex}`);
    console.log(node);

    // Check if the element exists
    if (node) {
      try {
        // Use html2canvas to capture the element
        const canvas = await html2canvas(node, {
          allowTaint: true,
          useCORS: true,
        });
        const imgData = canvas.toDataURL("image/png");
        const res = await fetch(imgData);
        const blob = await res.blob();

        const formData = new FormData();
        formData.append("videoUrl", videoTemplateList[videoTemplateIndex]);
        formData.append("image", new File([blob], "cropped_image.png", { type: "image/png" }));

        const response = await fetch(`${config.baseUrl}/edit-video`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const url = data.url;
          localStorage.setItem("GreetingVideo", url);
          navigate("/preview");
        } else {
          console.error("Failed to get the pre-signed URL for the edited video");
        }
      } catch (error) {
        console.error("Error during the submission process:", error);
      } finally {
        // Ensure that the modal is closed after the fetch request completes
        setModalIsOpen(false);
      }
    } else {
      console.error("Element not found");
      setModalIsOpen(false); // Close the modal if the element is not found
    }
  };

  useEffect(() => {
    fetchVideoTemplate();
    fetchImageTemplate();
  }, []);

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
        <div className={styles.videoBox}>
          <VideoTemplate templateList={videoTemplateList} handleCarosoulChange={handleVideoCarosoulChange} />
        </div>
        <div className={styles.imageBox}>
          <ImageTemplate
            templateList={imageTemplateList}
            handleCarosoulChange={handleImageCarosoulChange}
            imageTemplateIndex={imageTemplateIndex}
            handleSubmit={handleSubmit}
            values={values}
          />
        </div>
      </div>
      <div className={styles.right}>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <div className={styles.inputBox}>
            <div>Doctor's Name:</div>
            <div className={styles.drBox}>
              <div>Dr.</div>
              <input required type="text" name="doctorName" value={values.doctorName} onChange={handleChange} />
            </div>
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
      <LoadingModal modalIsOpen={modalIsOpen} />
    </div>
  );
}

export default Home;
