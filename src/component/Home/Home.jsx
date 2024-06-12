import React, { useEffect, useRef, useState } from "react";
import VideoTemplate from "../VideoTemplate/VideoTemplate";
import ImageTemplate from "../ImageTemplate/ImageTemplate";
import axios from "axios";
import config from "../../utils/config";
import html2canvas from "html2canvas";
import Preview from "../Preview/Preview";
function Home() {
  const [videoTemplateList, setVideoTemplateList] = useState([]);
  const [imageTemplateList, setImageTemplateList] = useState([]);
  const [videoTemplateIndex, setVideoTemplateIndex] = useState(0);
  const [imageTemplateIndex, setImageTemplateIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [url, setUrl] = useState("");
  const myDivRef = useRef(null);

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
    setIsSubmitted(true);
    let node = document.getElementById(`my-node-${imageTemplateIndex}`);
    console.log(node);

    // Check if the element exists
    if (node) {
      // Use html2canvas to capture the element
      const canvas = await html2canvas(node, {
        allowTaint: true,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      fetch(imgData)
        .then((res) => res.blob())
        .then(async (blob) => {
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
            setUrl(url);
          } else {
            console.error("Failed to get the pre-signed URL for the edited video");
          }
        });
    } else {
      console.error("Element not found");
    }
  };

  useEffect(() => {
    fetchVideoTemplate();
    fetchImageTemplate();
  }, []);

  useEffect(() => {
    if (isSubmitted && myDivRef.current) {
      myDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isSubmitted]);

  return (
    <div>
      <VideoTemplate templateList={videoTemplateList} handleCarosoulChange={handleVideoCarosoulChange} />
      <ImageTemplate
        templateList={imageTemplateList}
        handleCarosoulChange={handleImageCarosoulChange}
        imageTemplateIndex={imageTemplateIndex}
        handleSubmit={handleSubmit}
      />
      {isSubmitted && <Preview myDivRef={myDivRef} url={url} />}
    </div>
  );
}

export default Home;
