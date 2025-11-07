import React, { useState, useEffect } from 'react'
import HTMLFlipBook from "react-pageflip";
import axios from "axios";
import "../styles/Book.css";

function Book() {

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await axios.get("/api/items");
            const fetchedData = response.data;
            console.log("Data received:", fetchedData);
            setData(fetchedData);
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

  return (
    <HTMLFlipBook
      width={370}
      height={500}
      maxShadowOpacity={0.5}
      drawShadow={true}
      showCover={true}
      size='fixed'
    >

      {data.map((item) => (
        <div className="page" key={item.uuid}>
          <div className="page-content">
            <div className="item-container">

                <h2 className="item-title">{item.Title}</h2>
                <p className="item-description">{item.Description}</p>
                <p className="item-date">{item.Date}</p>
                <img
                    className="item-image"
                    alt={item.Title}
                />

            </div>
          </div>
        </div>
      ))}
    </HTMLFlipBook>

  );
}

export default Book