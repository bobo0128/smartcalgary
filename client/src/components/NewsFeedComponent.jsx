import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./NewsFeedComponent.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import parse from "html-react-parser";
import { getFirstFewWords, convertDateToLocalStr } from "../utils/utils";


const CustomPrevArrow = ({ className, onClick }) => {
  return (
    <button className={`${className} customized-button`} onClick={onClick}>
      &#9664;
    </button>
  );
};

const CustomNextArrow = ({ className, onClick }) => {
  return (
    <button className={`${className} customized-button`} onClick={onClick}>
      &#9654;
    </button>
  );
};

const NewsFeedComponent = () => {
  const [newsItems, setNewsItems] = useState([]);
  const fetchUrl = "https://newsroom.calgary.ca/tagfeed/en/tags/Police";

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");
        const items = xmlDoc.querySelectorAll("item");

        const newsArray = [];
        for (let i = 0; i < Math.min(items.length, 8); i++) {
          const title = items[i]?.childNodes[1]?.textContent || "";
          const description = items[i]?.childNodes[7]?.textContent || "";
          const pubDate = items[i]?.childNodes[10]?.textContent || "";
          const link = items[i]?.childNodes[3]?.textContent || "";

          const shortDescription = getFirstFewWords(description, 30);

          newsArray.push({ title, description: shortDescription, pubDate, link });
        }

        setNewsItems(newsArray);
      } catch (error) {
        console.error("Error fetching the RSS feed: ", error);
      }
    };

    fetchRSS();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true ,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="news" className="news-feed-container">
      <h3>News Feed</h3>
      {newsItems.length > 0 ? (
        <Slider {...settings}>
          {newsItems.map((item, index) => (
            <div key={index} className="news-item">
              <div className="news-header universal-color">
                <h4 className="header-title-color">{item.title}</h4>
              </div>
              <div className="news-content">
                <p className="news-footer">{convertDateToLocalStr(item.pubDate)}</p>
                <p>{parse(item.description)} <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Read more
                </a></p>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewsFeedComponent;
