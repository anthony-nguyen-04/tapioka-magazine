import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material';

import { Magazine, getAllMagazines, getMagazineByID, getNewestMagazineID, setMagazineThumbnailURL } from "../Magazines/Magazines";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import "swiper/css";
import "swiper/css/navigation";

import styled from "@emotion/styled";

const ReaderContainer = styled.div`
  width: 100%;
  min-height: 125vh;
  background-color: #FAF4EA;

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
  const [allMagazines, setAllMagazines] = useState<Magazine[]>([]);
  const [currentMagID, setCurrentMagID] = useState<number>(1);

  useEffect(() => {
    async function fetchMagazines() {
      const magazines = await getAllMagazines();

      setAllMagazines(magazines);
    }

    async function fetchNewestMagazineID() {
      const id = await getNewestMagazineID();

      setCurrentMagID(id);
    }

    fetchMagazines();
    fetchNewestMagazineID();
  }, []);
    
  return (
    <ReaderContainer id="read">
      <ThemeProvider theme={fontTheme}>
        <TitleContainer>
          <Typography variant="h2" fontWeight={600}>
            {(allMagazines.length !== 0) ? getMagazineByID(currentMagID, allMagazines).name : "LOADING..."}
          </Typography>
        </TitleContainer>
      </ThemeProvider>
      <MagazineContainer>
        <iframe
          title="magazine"
          allow="clipboard-write"
          sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
          allowFullScreen={true}
          style={{ width: "100%", height: "70%", minHeight: "70vh", marginTop: "1rem" }}
          src={(allMagazines.length !== 0) ? getMagazineByID(currentMagID, allMagazines).embedurl : ""}>
        </iframe>
      </MagazineContainer>
      <MagazineCarouselContainer>
        {
          (allMagazines.length !== 0)
          &&
          (
            <Swiper
              initialSlide={allMagazines.length - 1}
              slidesPerView={"auto"}
              spaceBetween={10}
              speed={500}
              navigation  
              centeredSlides
              grabCursor
              watchSlidesProgress
              observer
              observeParents
              breakpoints={{
                300: {
                  slidesPerView: 1.3,
                  spaceBetween: 10,
                },
                550: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                700: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1000: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1400: {
                  slidesPerView: 4.5,
                  spaceBetween: 10,
                },
              }}
              modules={[ Navigation ]}        
              className="magazineSwiper"
            >
              {
                allMagazines.map((magazine) => (
                  <SwiperSlide key={magazine.id}>
                    <img
                      src={setMagazineThumbnailURL(magazine.thumbnailurl)}
                      alt={magazine.name}
                      onClick={() => setCurrentMagID(magazine.id)}
                      style={{ marginTop: "4px" }}
                    />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          )
        }
      </MagazineCarouselContainer>
    </ReaderContainer> 
  );
}

export default Reader;