import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material';

import { allMagazines, getMagazineByID, getNewestMagazineID, setMagazineEmbedLink } from "../Magazines/Magazines";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

import styled from "@emotion/styled";


const ReaderContainer = styled.div`
  width: 100%;
  min-height: 125vh;
  background-color: #F6DAB6;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  
  overflow-y: auto;
`;

const TitleContainer = styled.div`
  text-align: center;

  margin-top: 4.5rem;
`;

const MagazineContainer = styled.section`
  width: 70%;
  max-width: 1000px;
  height: 75%;

  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
`;

const MagazineCarouselContainer = styled.section`
  width: 80%;
  max-width: 1200px;
  height: fit-content;

  justify-content: center;
  align-items: center;

  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  background-color: #353535;

`;

const fontTheme = createTheme({
  typography: {
    fontFamily: [
      'Signika',
      'sans-serif',
    ].join(','),
  },});

const Reader = () => {
  const [currentMagID, setCurrentMagID] = useState<number>(getNewestMagazineID());

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4.67,
    slidesToScroll: 1,
    draggable: false,
    adaptiveHeight: true,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "1rem",
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2.3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1
        }
      }
    ]
  };
    
  return (
    <ReaderContainer id="read">
      <ThemeProvider theme={fontTheme}>
        <TitleContainer>
          <Typography variant="h2" fontWeight={600}>
            {getMagazineByID(currentMagID).name}
          </Typography>
        </TitleContainer>
      </ThemeProvider>
      <MagazineContainer>
        <iframe
          title="magazine"
          allow="clipboard-write"
          sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
          allowFullScreen={true}
          style={{ width: "100%", height: "70%", minHeight: "60vh", marginTop: "1rem" }}
          src={setMagazineEmbedLink(currentMagID)}>
        </iframe>
      </MagazineContainer>
      <MagazineCarouselContainer>
        <Slider {...sliderSettings}>
          {
            allMagazines.map((magazine) => (
              <React.Fragment key={magazine.id}>
                <img
                  src={require(`../Assets/thumbnails/${magazine.thumbnail}`)}
                  alt={magazine.thumbnail}
                  onClick={() => setCurrentMagID(magazine.id)}
                />
              </React.Fragment>
            ))
          }
        </Slider>
      </MagazineCarouselContainer>
    </ReaderContainer> 
  );
}

export default Reader;