import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";

import AboutPhoto from "../Assets/images/about.jpg";

import styled from "@emotion/styled";

const AboutContainer = styled.div<AboutContainerProps>`
  width: 100%;
  min-height: 100vh;
  background-color: #D3D3D3;

  display: flex;
  flex-direction: ${(props) => props.isMobile ? "column" : "row"};

  box-sizing: border-box;
  
  overflow-y: auto;
`;

const TextContainer = styled.section`
  width: 50%;
  min-width: 320px;
  height: 60%;

  text-align: left;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  margin: auto;
  padding-top: 2rem;
`;

const ImageContainer = styled.section`
  width: 35%;
  min-width: 320px;
  height: 60%;

  display: flex;

  justify-content: center;
  align-items: center;

  margin: auto;
  padding: 1rem;
`;

const fontTheme = createTheme({
  typography: {
    fontFamily: [
      'Signika',
      'sans-serif',
    ].join(','),
  },});

type AboutContainerProps = {
  isMobile: boolean
}

type Props = {
  isMobile: boolean
}  

const About = ({
  isMobile
}: Props) => {
  
  function bold(text: string) : React.JSX.Element {
    return (
      <Box display="inline" fontWeight={600}>
        {text}
      </Box>
    );
  }
  
  function newLine() : React.JSX.Element {
    return (
      <Typography noWrap>
        &nbsp;
      </Typography>
    );
  }

  return (
    <AboutContainer key={String(isMobile)} id="about" isMobile={isMobile} >
      <ThemeProvider theme={fontTheme}>
        <TextContainer>
          <Typography variant="h2" fontWeight={600}>
            ABOUT US
          </Typography>
          {newLine()}
          {newLine()}
          <Typography style={{ display: "inline-block" }} variant="h6">
            {bold("TAPIOKA MAGAZINE")} is Oklahoma's first publication with a focus on APIDA-MENA (Asian Pacific Islander Desi American - Middle Eastern North African) culture.
            Starting off as a monthly magazine under the University of Oklahoma's Asian American Student Association in 2022, TAPIOKA has seen exponential
            growth as we continue to evolve and innovate.
          </Typography> 
          {newLine()}
          {newLine()}
          <Typography style={{ display: "inline-block" }} variant="h6">
            Through written and creative media, we hope to highlight Oklahoma's APIDA-MENA community and celebrate the rich heritage and history that comes with it.
            Three times a year, our team comes together to craft a cohesive issue, diving deep into a particular aspect of our identity.
            From {bold("PASSION")} to {bold("TRAUMA")} and {bold("ACCEPTANCE")}, here is our story.
          </Typography>
          {newLine()}
          {newLine()}
          <Button
            fullWidth
            type="submit"
            size="large"
            onClick={() => window.open("https://ou.campuslabs.com/engage/submitter/form/start/593118", "_blank")}
            sx={{
              backgroundColor: "#353535",
              color: "#EEE",
              "&:hover": {
                backgroundColor: "#111",
              },
              width: "15%",
              minWidth: "200px",
              margin: "0.5rem",
              boxSizing: "border-box"
            }}
          >
            Apply To Our Team
          </Button>
        </TextContainer>
      </ThemeProvider>
      <ImageContainer>
        <img src={AboutPhoto} alt="About Page" width="100%" />
      </ImageContainer>
    </AboutContainer> 
  );
}

export default About;