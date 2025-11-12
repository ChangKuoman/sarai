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
      usePortrait={false}
      size='fixed'
    >

      <div className="page" style={{ background: 'transparent' }}>
        <div className="page-content cover">
          <h1 className='cover-title'>La historia de Sam y Saraí</h1>
          <img
            className="cover-image"
            src="/src/assets/cover_image.jpg"
            alt="Cover"
          />
        </div>
      </div>

      {data
        .slice()
        .sort((a, b) => (Date.parse(a.Date) || 0) - (Date.parse(b.Date) || 0))
        .flatMap((item) => [
          <div className="page left" key={`${item.uuid}-left`}>
            <div className="page-content">
               <h2 className="item-title">{item.Title}</h2>
                <p className="item-date">{item.Date}</p>
                <img
                  className="item-image"
                  src={`${item.ImageUrl}`}
                  alt={item.Title}
                />
            </div>
          </div>,
          <div className="page right" key={`${item.uuid}-right`}>
            <div className="page-content">
              <p className="item-description">Saraí<br/>{item.Description}</p>
              <p className="item-description">Sam<br/>{item.Description}</p>
            </div>
          </div>
        ])}

    </HTMLFlipBook>
  );
}

export default Book