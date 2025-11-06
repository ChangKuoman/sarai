import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // API Gateway url to invoke function to generate presigned url
  const API_ENDPOINT = "http://localhost:5000/api/generar-url-subida";

  // Function to generate the presigned url
  const getPresignedUrl = async () => {
    // GET request: presigned URL
    const response = await axios({
      method: "GET",
      url: API_ENDPOINT,
    });
    const presignedUrl = response.data.presignedUrl;
    const key = response.data.key;
    console.log(presignedUrl);
    console.log(key);
    return { presignedUrl, key };
  };

  // Function to upload the selected file using the generated presigned url
  const uploadToPresignedUrl = async (presignedUrl) => {
    // Upload file to pre-signed URL
    const uploadResponse = await axios.put(presignedUrl, selectedFile, {
      headers: {
        "Content-Type": "application/png",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
        console.log(`Upload Progress: ${percentCompleted}%`);
      },
    });
    console.log(uploadResponse);
  };

  // Function to orchestrate the upload process
  const handleUpload = async () => {
    try {
      // Ensure a file is selected
      if (!selectedFile) {
        console.error("No file selected.");
        return;
      }

      const { presignedUrl, key } = await getPresignedUrl();
      uploadToPresignedUrl(presignedUrl);

      // After successful upload, send POST request with metadata
      const response = await axios.post('http://localhost:5000/api/items', {
        date,
        title,
        description,
        filename: key
      });
      // Show the response data
      console.log('Upload metadata response:', response.data);

    } catch (error) {
      // Handle error
      console.error("Error uploading file:", error);
    }
  };

  // ---------------------------
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      console.log("Data received:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // ---------------------------


  return (
    <div className="App">
      <h1>File Selection Component</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <div>
        <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} />
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      </div>

      <button onClick={getData}>Click for data</button>
    </div>
  );
}

export default App;